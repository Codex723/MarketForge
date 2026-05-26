import express from "express";
import {
  createCheckoutSession,
  verifyPayment,
  paystackWebhook,
  getMyOrders,
  getVendorOrders,
  updateOrderStatus,
  getAllOrders,
} from "../controllers/order.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

// Paystack webhook
router.post("/webhook", express.json(), paystackWebhook);

// Payment
router.post("/checkout", protect, authorize("customer"), createCheckoutSession);
router.post("/verify", protect, authorize("customer"), verifyPayment);

// Orders
router.get("/my", protect, authorize("customer"), getMyOrders);
router.get("/vendor", protect, authorize("vendor"), getVendorOrders);
router.put("/:id/status", protect, authorize("vendor"), updateOrderStatus);
router.get("/admin", protect, authorize("admin"), getAllOrders);

export default router;
