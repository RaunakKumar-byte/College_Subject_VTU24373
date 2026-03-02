import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createEvent,
  getDashboardEvents,
  deleteEvent,
    getEventsPage

} from "../controllers/eventController.js";

const router = express.Router();

router.get("/dashboard", protect, getDashboardEvents);
router.post("/events/create", protect, createEvent);
router.get("/events/delete/:id", protect, deleteEvent);
router.get("/events", protect, getEventsPage);

export default router;