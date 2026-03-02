import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getRegister = (req, res) => {
  res.render("register");
};

export const postRegister = async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.execute(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, hashedPassword]
  );

  res.redirect("/login");
};

export const getLogin = (req, res) => {
  res.render("login");
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await pool.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0) return res.send("User not found");

  const user = rows[0];

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.send("Wrong password");

  const token = jwt.sign(
  { id: user.id, username: user.username, email: user.email },
  "secretkey",
  { expiresIn: "1h" }
);

  res.cookie("token", token);
  res.redirect("/dashboard");
};

export const getDashboard = async (req, res) => {
  const [events] = await pool.execute(
    "SELECT * FROM events WHERE user_id = ?",
    [req.user.id]
  );
  res.render("dashboard", { 
    user: req.user,
    events: events || [],
    totalEvents: events ? events.length : 0,
    activeEvents: 0,
    completedEvents: 0,
    onlineUsers: 0
  });
};
export const getProfile = (req, res) => {
  res.render("profile", { user: req.user });
};
export const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};