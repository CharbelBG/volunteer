import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import { createEvent, getEvents, getEventById, putVolunteer } from "../controllers/eventController.js";

router.route("/").post(protect, createEvent);
router.route("/").get(getEvents);
router.route("/:id").get(getEventById);
router.route("/volunteer/:id").put(protect, putVolunteer);

export default router;
