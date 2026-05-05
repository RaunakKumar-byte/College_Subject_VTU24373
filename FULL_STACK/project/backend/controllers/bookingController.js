import pool from "../config/db.js";

export const createBooking = async (req, res) => {
  const eventId = Number(req.params.id);
  const seatCount = Math.floor(Number(req.body.seat_count ?? 1));
  const userId = Number(req.user.id);

  if (!eventId || seatCount <= 0 || !userId) {
    return res.status(400).json({ success: false, message: "Invalid booking request." });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [rows] = await connection.execute("SELECT * FROM events WHERE id = ? FOR UPDATE", [eventId]);

    if (!rows.length) {
      await connection.rollback();
      return res.status(404).json({ success: false, message: "Event not found." });
    }

    const event = rows[0];

    let available =
      event.available_seats != null && event.available_seats !== ""
        ? Number(event.available_seats)
        : event.total_seats != null && event.total_seats !== ""
          ? Number(event.total_seats)
          : null;

    if (available == null || Number.isNaN(available)) {
      available = Number.MAX_SAFE_INTEGER;
    }

    if (available < seatCount) {
      await connection.rollback();
      return res.status(409).json({ success: false, message: "Not enough seats available." });
    }

    try {
      await connection.execute(
        "INSERT INTO bookings (user_id, event_id, seat_count) VALUES (?, ?, ?)",
        [userId, eventId, seatCount]
      );
    } catch (insertErr) {
      await connection.rollback();
      console.error("booking INSERT:", insertErr.code, insertErr.message);
      if (insertErr.code === "ER_NO_SUCH_TABLE" || insertErr.errno === 1146) {
        return res.status(503).json({
          success: false,
          message: "Database missing `bookings` table. Run backend/schema.sql.",
        });
      }
      if (insertErr.errno === 1452) {
        return res.status(400).json({
          success: false,
          message: "Invalid user or event (check login and event id).",
        });
      }
      throw insertErr;
    }

    try {
      await connection.execute(
        `UPDATE events
         SET available_seats = GREATEST(COALESCE(available_seats, total_seats, 0) - ?, 0)
         WHERE id = ?`,
        [seatCount, eventId]
      );
    } catch (updateErr) {
      if (updateErr.code === "ER_BAD_FIELD_ERROR" || updateErr.errno === 1054) {
        console.warn("booking UPDATE seats skipped (column missing):", updateErr.message);
      } else {
        throw updateErr;
      }
    }

    const newAvailable = Math.max(0, available - seatCount);

    await connection.commit();

    req.io?.emit("seat-updated", {
      eventId,
      availableSeats: newAvailable,
    });
    req.io?.emit("booking-created", { eventId, title: event.title });
    req.io?.emit("events-refresh");

    return res.json({ success: true, message: "Booking confirmed instantly." });
  } catch (error) {
    if (connection) {
      try {
        await connection.rollback();
      } catch {
        /* ignore */
      }
    }
    console.error("createBooking:", error.code, error.message);
    const devHint =
      process.env.NODE_ENV === "development" || process.env.BOOKING_DEBUG === "1";
    return res.status(500).json({
      success: false,
      message: devHint ? error.message : "Booking failed. Try again.",
      code: devHint ? error.code : undefined,
    });
  } finally {
    if (connection) connection.release();
  }
};
