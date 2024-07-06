import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

// router.route("/profile").get(protect, getUser).put(protect, updateUserProfile);

export default router;
