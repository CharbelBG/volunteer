import express from "express";
const router = express.Router();
import { search } from "../controllers/searchController.js";

router.route("/").get(search);

export default router;
