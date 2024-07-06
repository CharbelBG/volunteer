import express from "express";
const router = express.Router();
import {
  getCategories,
  createCategory,
} from "../controllers/categoriesController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(getCategories).post(protect, createCategory);

export default router;
