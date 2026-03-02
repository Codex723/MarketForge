import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Admin
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "customer" });
    const totalVendors = await User.countDocuments({ role: "vendor" });
    const pendingVendors = await User.countDocuments({ role: "vendor", isApproved: false });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments({ status: { $ne: "pending" } });

    const revenueData = await Order.aggregate([
      { $match: { status: { $in: ["paid", "processing", "shipped", "delivered"] } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const totalRevenue = revenueData[0]?.total || 0;

    const recentOrders = await Order.find({ status: { $ne: "pending" } })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("customer", "name email");

    res.status(200).json({
      stats: { totalUsers, totalVendors, pendingVendors, totalProducts, totalOrders, totalRevenue },
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }).sort({ createdAt: -1 });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve or suspend a vendor
// @route   PUT /api/admin/vendors/:id
// @access  Admin
export const updateVendorStatus = async (req, res) => {
  try {
    const { isApproved } = req.body;
    const vendor = await User.findOneAndUpdate(
      { _id: req.params.id, role: "vendor" },
      { isApproved },
      { new: true }
    );
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json({ message: `Vendor ${isApproved ? "approved" : "suspended"}`, vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role === "admin") return res.status(400).json({ message: "Cannot delete admin" });
    await user.deleteOne();
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
