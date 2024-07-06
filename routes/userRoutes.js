import express from "express";
const router = express.Router();
import health from "../controllers/health.js";

router.route("/health").get(health);

export default router;
