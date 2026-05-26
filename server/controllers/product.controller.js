import Product from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";

// Helper: upload buffer to Cloudinary
const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Vendor only
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock } = req.body;

    if (!title || !description || !price || !category) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one product image is required" });
    }

    // Upload all images to Cloudinary
    const imageUploads = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer, "markeforge/products"))
    );

    const images = imageUploads.map((result) => ({
      url: result.secure_url,
      publicId: result.public_id,
    }));

    const product = await Product.create({
      title,
      description,
      price: Number(price),
      category,
      stock: Number(stock) || 1,
      images,
      vendor: req.user._id,
    });

    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all products for the logged-in vendor
// @route   GET /api/products/my
// @access  Vendor only
export const getMyProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments({ vendor: req.user._id });
    const products = await Product.find({ vendor: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      products,
      pagination: { total, page, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "vendor",
      "name storeName avatar"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Vendor only (own products)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Ensure vendor owns this product
    if (product.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this product" });
    }

    const { title, description, price, category, stock, isActive } = req.body;

    // If new images are uploaded, delete old ones and upload new
    if (req.files && req.files.length > 0) {
      // Delete old images from Cloudinary
      await Promise.all(
        product.images.map((img) => cloudinary.uploader.destroy(img.publicId))
      );

      // Upload new images
      const imageUploads = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer, "markeforge/products"))
      );

      product.images = imageUploads.map((result) => ({
        url: result.secure_url,
        publicId: result.public_id,
      }));
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price ? Number(price) : product.price;
    product.category = category || product.category;
    product.stock = stock !== undefined ? Number(stock) : product.stock;
    product.isActive = isActive !== undefined ? isActive : product.isActive;

    await product.save();

    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Vendor only (own products)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this product" });
    }

    // Delete images from Cloudinary
    await Promise.all(
      product.images.map((img) => cloudinary.uploader.destroy(img.publicId))
    );

    await product.deleteOne();

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get vendor dashboard stats
// @route   GET /api/products/stats
// @access  Vendor only
export const getVendorStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({ vendor: req.user._id });
    const activeProducts = await Product.countDocuments({ vendor: req.user._id, isActive: true });
    const outOfStock = await Product.countDocuments({ vendor: req.user._id, stock: 0 });

    const recentProducts = await Product.find({ vendor: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title price stock images isActive createdAt");

    res.status(200).json({
      stats: { totalProducts, activeProducts, outOfStock },
      recentProducts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
