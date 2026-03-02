import express from "express";
import {
  createProduct,
  getMyProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getVendorStats,
} from "../controllers/product.controller.js";
import { protect, authorize, vendorApproved } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

// Vendor-only middleware stack
const vendorOnly = [protect, authorize("vendor", "admin"), vendorApproved];

router.get("/stats", vendorOnly, getVendorStats);
router.get("/my", vendorOnly, getMyProducts);
router.post("/", vendorOnly, upload.array("images", 5), createProduct);
router.get("/:id", getProductById); // public
router.put("/:id", vendorOnly, upload.array("images", 5), updateProduct);
router.delete("/:id", vendorOnly, deleteProduct);

export default router;
