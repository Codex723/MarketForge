import express from "express";
import { getShopProducts } from "../controllers/shop.controller.js";

const router = express.Router();
router.get("/products", getShopProducts);
export default router;
