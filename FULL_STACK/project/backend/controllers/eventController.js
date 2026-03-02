import pool from "../config/db.js";

export const createEvent = async (req, res) => {
  const { title, description, category, event_date } = req.body;

  await pool.execute(
    "INSERT INTO events (title, description, category, event_date, user_id) VALUES (?, ?, ?, ?, ?)",
    [title, description, category, event_date, req.user.id]
  );

  res.redirect("/dashboard");
};

export const getDashboardEvents = async (req, res) => {
  const [events] = await pool.execute(
    "SELECT * FROM events WHERE user_id = ? ORDER BY created_at DESC",
    [req.user.id]
  );

  res.render("dashboard", {
    user: req.user,
    events,
  });
};
export const getEventsPage = async (req, res) => {
  const [events] = await pool.execute(
    "SELECT * FROM events WHERE user_id = ? ORDER BY created_at DESC",
    [req.user.id]
  );

  res.render("events", {
    user: req.user,
    events,
  });
};
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  await pool.execute(
    "DELETE FROM events WHERE id = ? AND user_id = ?",
    [id, req.user.id]
  );

  res.redirect("/dashboard");
};