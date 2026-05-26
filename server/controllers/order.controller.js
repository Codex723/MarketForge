import https from "https";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import dotenv from "dotenv";
dotenv.config();

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

// Helper: call Paystack REST API
function paystackRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path,
      method,
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error("Invalid Paystack response"));
        }
      });
    });

    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// @desc    Initialize Paystack transaction
// @route   POST /api/orders/checkout
// @access  Customer
export const createCheckoutSession = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId).populate("vendor", "_id");
      if (!product) return res.status(404).json({ message: `Product not found: ${item.productId}` });
      if (!product.isActive) return res.status(400).json({ message: `${product.title} is no longer available` });
      if (product.stock < item.quantity) return res.status(400).json({ message: `Not enough stock for ${product.title}` });

      orderItems.push({
        product: product._id,
        vendor: product.vendor._id,
        title: product.title,
        image: product.images?.[0]?.url || "",
        price: product.price,
        quantity: item.quantity,
      });

      totalAmount += product.price * item.quantity;
    }

    // Create pending order first
    const order = await Order.create({
      customer: req.user._id,
      items: orderItems,
      totalAmount,
      shippingAddress,
      status: "pending",
    });

    // Initialize Paystack transaction (amount in kobo = NGN * 100)
    const paystackRes = await paystackRequest("POST", "/transaction/initialize", {
      email: req.user.email,
      amount: Math.round(totalAmount * 100),
      currency: "NGN",
      reference: `MKF-${order._id.toString()}`,
      callback_url: `${process.env.CLIENT_URL}/checkout/success`,
      metadata: {
        orderId: order._id.toString(),
        cancel_action: `${process.env.CLIENT_URL}/cart`,
      },
    });

    if (!paystackRes.status) {
      await Order.findByIdAndDelete(order._id);
      return res.status(400).json({ message: paystackRes.message || "Paystack initialization failed" });
    }

    order.paystackReference = paystackRes.data.reference;
    await order.save();

    res.status(200).json({ url: paystackRes.data.authorization_url, reference: paystackRes.data.reference });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify Paystack payment and update order
// @route   POST /api/orders/verify
// @access  Customer
export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.body;

    if (!reference) {
      return res.status(400).json({ message: "Payment reference is required" });
    }

    const paystackRes = await paystackRequest("GET", `/transaction/verify/${encodeURIComponent(reference)}`);

    if (!paystackRes.status || paystackRes.data.status !== "success") {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const orderId = paystackRes.data.metadata?.orderId;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "pending") {
      return res.status(200).json({ message: "Order already processed", order });
    }

    order.status = "paid";
    order.paystackPaymentId = String(paystackRes.data.id);
    await order.save();

    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    res.status(200).json({ message: "Payment verified", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Paystack webhook
// @route   POST /api/orders/webhook
// @access  Paystack only
export const paystackWebhook = async (req, res) => {
  const event = req.body;

  if (event.event === "charge.success") {
    const reference = event.data.reference;
    const order = await Order.findOne({ paystackReference: reference });

    if (order && order.status === "pending") {
      order.status = "paid";
      order.paystackPaymentId = String(event.data.id);
      await order.save();

      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity },
        });
      }
    }
  }

  res.sendStatus(200);
};

// @desc    Get customer orders
// @route   GET /api/orders/my
// @access  Customer
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .sort({ createdAt: -1 })
      .populate("items.product", "title images");

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get vendor orders
// @route   GET /api/orders/vendor
// @access  Vendor
export const getVendorOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      "items.vendor": req.user._id,
      status: { $ne: "pending" },
    })
      .sort({ createdAt: -1 })
      .populate("customer", "name email");

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Vendor
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["processing", "shipped", "delivered"];

    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const isVendorOrder = order.items.some(
      (i) => i.vendor.toString() === req.user._id.toString()
    );
    if (!isVendorOrder) return res.status(403).json({ message: "Not authorized" });

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (admin)
// @route   GET /api/orders/admin
// @access  Admin
export const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const total = await Order.countDocuments({ status: { $ne: "pending" } });
    const orders = await Order.find({ status: { $ne: "pending" } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("customer", "name email");

    res.status(200).json({ orders, pagination: { total, page, pages: Math.ceil(total / limit) } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
