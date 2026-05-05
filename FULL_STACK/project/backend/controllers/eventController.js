import pool from "../config/db.js";
import { listEventsForApp } from "../utils/eventsData.js";

export const createEvent = async (req, res) => {
  const { title, description, category, event_date, total_seats } = req.body;
  const seats = Number(total_seats) || 1;
  try {
    try {
      await pool.execute(
        `INSERT INTO events (title, description, category, event_date, total_seats, available_seats, created_by)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [title, description, category, event_date, seats, seats, req.user.id]
      );
    } catch (err) {
      if (err.code === "ER_BAD_FIELD_ERROR" || err.errno === 1054) {
        await pool.execute(
          `INSERT INTO events (title, description, category, event_date, user_id)
           VALUES (?, ?, ?, ?, ?)`,
          [title, description, category, event_date, req.user.id]
        );
      } else {
        throw err;
      }
    }
    req.io.emit("events-refresh");
    return res.redirect("/events");
  } catch (error) {
    console.error("createEvent:", error.message);
    return res.status(500).redirect("/events");
  }
};

export const getDashboardEvents = async (req, res) => {
  return res.redirect("/dashboard");
};
export const getEventsPage = async (req, res) => {
  try {
    const events = await listEventsForApp(pool);
    return res.render("events", { user: req.user, events, message: null });
  } catch (error) {
    console.error("getEventsPage:", error.message);
    return res
      .status(500)
      .render("events", { user: req.user, events: [], message: "Unable to load events." });
  }
};

/** JSON API for SPA or dynamic refresh — requires login cookie. */
export const getEventsApi = async (req, res) => {
  try {
    const events = await listEventsForApp(pool);
    return res.json({ success: true, events });
  } catch (error) {
    console.error("getEventsApi:", error.message);
    return res.status(500).json({ success: false, message: "Failed to load events." });
  }
};
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  await pool.execute("DELETE FROM events WHERE id = ?", [id]);
  req.io.emit("events-refresh");

  res.redirect("/events");
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, event_date, total_seats } = req.body;

  try {
    const [rows] = await pool.execute("SELECT total_seats, available_seats FROM events WHERE id = ?", [id]);
    if (!rows.length) {
      return res.redirect("/events");
    }
    const oldTotal = Number(rows[0].total_seats);
    const oldAvailable = Number(rows[0].available_seats);
    const newTotal = Number(total_seats);
    const bookedCount = oldTotal - oldAvailable;
    const newAvailable = Math.max(newTotal - bookedCount, 0);

    await pool.execute(
      `UPDATE events
       SET title = ?, description = ?, category = ?, event_date = ?, total_seats = ?, available_seats = ?
       WHERE id = ?`,
      [title, description, category, event_date, newTotal, newAvailable, id]
    );

    req.io.emit("events-refresh");
    return res.redirect("/events");
  } catch (error) {
    return res.redirect("/events");
  }
};