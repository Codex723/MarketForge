import express from "express";
import { getAdminStats, getAllUsers, updateVendorStatus, deleteUser } from "../controllers/admin.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

const adminOnly = [protect, authorize("admin")];

router.get("/stats", adminOnly, getAdminStats);
router.get("/users", adminOnly, getAllUsers);
router.put("/vendors/:id", adminOnly, updateVendorStatus);
router.delete("/users/:id", adminOnly, deleteUser);

export default router;
