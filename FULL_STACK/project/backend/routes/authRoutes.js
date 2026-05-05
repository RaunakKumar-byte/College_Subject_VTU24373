import express from "express";
import {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getDashboard,
  getProfile,
  logout,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/register", getRegister);
router.post("/register", postRegister);

router.get("/login", getLogin);
router.post("/login", postLogin);

router.get("/dashboard", protect, getDashboard);
router.get("/profile", protect, getProfile);
router.get("/logout", logout);

export default router;