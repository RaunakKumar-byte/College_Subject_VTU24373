import express from "express";
import { protect, requireRole } from "../middleware/authMiddleware.js";
import {
  createEvent,
  getDashboardEvents,
  deleteEvent,
  getEventsPage,
  getEventsApi,
  updateEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/dashboard", protect, getDashboardEvents);
router.post("/events/create", protect, requireRole("admin"), createEvent);
router.post("/events/update/:id", protect, requireRole("admin"), updateEvent);
router.get("/events/delete/:id", protect, requireRole("admin"), deleteEvent);
router.get("/events", protect, getEventsPage);
router.get("/api/events", protect, getEventsApi);

export default router;