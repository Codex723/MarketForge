import express from "express";
import { createReview, getProductReviews } from "../controllers/review.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, authorize("customer"), createReview);
router.get("/:productId", getProductReviews);

export default router;
