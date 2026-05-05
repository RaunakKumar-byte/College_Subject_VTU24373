import express from "express";
import { protect, requireRole } from "../middleware/authMiddleware.js";
import { createBooking } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/events/:id/book", protect, requireRole("user", "admin"), createBooking);

export default router;
