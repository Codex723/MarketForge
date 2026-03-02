import Review from "../models/review.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

// @desc    Create a review (must have purchased product)
// @route   POST /api/reviews
// @access  Customer
export const createReview = async (req, res) => {
  try {
    const { productId, orderId, rating, comment } = req.body;

    // Verify customer actually ordered this product
    const order = await Order.findOne({
      _id: orderId,
      customer: req.user._id,
      "items.product": productId,
      status: "delivered",
    });

    if (!order) {
      return res.status(403).json({ message: "You can only review products you have received" });
    }

    const existing = await Review.findOne({ product: productId, customer: req.user._id });
    if (existing) {
      return res.status(400).json({ message: "You have already reviewed this product" });
    }

    const review = await Review.create({
      product: productId,
      customer: req.user._id,
      order: orderId,
      rating,
      comment,
    });

    res.status(201).json({ message: "Review submitted", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate("customer", "name avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
