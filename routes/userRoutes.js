import express from "express";
const router = express.Router();
import {
  login,
  registerUser,
  getUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/login").post(login);
router.route("/register").post(registerUser);
router.route("/profile").get(protect, getUser).put(protect, updateUserProfile);

export default router;
