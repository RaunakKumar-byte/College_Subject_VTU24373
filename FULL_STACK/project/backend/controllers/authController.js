import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { listEventsForApp } from "../utils/eventsData.js";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export const getRegister = (req, res) => {
  res.render("register", { error: null });
};

export const postRegister = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const [existing] = await pool.execute("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).render("register", { error: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const safeRole = role === "admin" ? "admin" : "user";

    try {
      await pool.execute(
        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
        [username, email, hashedPassword, safeRole]
      );
    } catch (insertError) {
      // Backward compatibility for older schema where `role` column does not exist yet.
      if (insertError?.code === "ER_BAD_FIELD_ERROR") {
        await pool.execute(
          "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
          [username, email, hashedPassword]
        );
      } else {
        throw insertError;
      }
    }

    return res.redirect("/login");
  } catch (error) {
    console.error("Registration failed:", error.message);
    return res.status(500).render("register", { error: "Registration failed. Check DB schema and try again." });
  }
};

export const getLogin = (req, res) => {
  res.render("login", { error: null });
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(404).render("login", { error: "User not found." });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).render("login", { error: "Wrong password." });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, role: user.role || "user" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true });
    return res.redirect("/dashboard");
  } catch (error) {
    return res.status(500).render("login", { error: "Login failed." });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const events = await listEventsForApp(pool);
    const [myBookings] = await pool.execute(
      `SELECT b.id, b.created_at, e.title, e.event_date, b.seat_count
       FROM bookings b
       JOIN events e ON e.id = b.event_id
       WHERE b.user_id = ?
       ORDER BY b.created_at DESC`,
      [req.user.id]
    );
    const [allBookings] = req.user.role === "admin"
      ? await pool.execute(
          `SELECT b.id, b.created_at, b.seat_count, u.username, e.title
           FROM bookings b
           JOIN users u ON u.id = b.user_id
           JOIN events e ON e.id = b.event_id
           ORDER BY b.created_at DESC`
        )
      : [[]];

    return res.render("dashboard", {
      user: req.user,
      events,
      myBookings,
      allBookings,
      onlineUsers: 0,
      message: null,
    });
  } catch (error) {
    return res.status(500).render("dashboard", {
      user: req.user,
      events: [],
      myBookings: [],
      allBookings: [],
      onlineUsers: 0,
      message: "Unable to load dashboard.",
    });
  }
};
export const getProfile = (req, res) => {
  res.render("profile", { user: req.user });
};
export const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};