/**
 * Loads events across legacy and current schemas (created_by vs user_id, optional columns).
 */
export function normalizeEventRow(row) {
  const total =
    row.total_seats != null && row.total_seats !== ""
      ? Number(row.total_seats)
      : 100;
  let available =
    row.available_seats != null && row.available_seats !== ""
      ? Number(row.available_seats)
      : total;
  if (available > total) available = total;
  if (Number.isNaN(total) || total < 0) {
    return {
      ...row,
      total_seats: 0,
      available_seats: 0,
      creator_name: row.creator_name || "Organizer",
    };
  }
  return {
    ...row,
    total_seats: total,
    available_seats: Math.max(0, available),
    creator_name: row.creator_name || "Organizer",
  };
}

export async function listEventsForApp(pool) {
  const attempts = [
    `SELECT e.*, u.username AS creator_name
     FROM events e
     INNER JOIN users u ON u.id = e.created_by
     ORDER BY e.event_date ASC, e.created_at DESC`,
    `SELECT e.*, u.username AS creator_name
     FROM events e
     INNER JOIN users u ON u.id = e.user_id
     ORDER BY e.event_date ASC, e.created_at DESC`,
    `SELECT e.*
     FROM events e
     ORDER BY e.event_date ASC`,
  ];

  let lastError;
  for (const sql of attempts) {
    try {
      const [rows] = await pool.execute(sql);
      return rows.map((r) =>
        normalizeEventRow({
          ...r,
          creator_name: r.creator_name ?? r.username ?? null,
        })
      );
    } catch (e) {
      lastError = e;
      if (e.code === "ER_BAD_FIELD_ERROR" || e.errno === 1054) continue;
      throw e;
    }
  }

  console.error("listEventsForApp failed:", lastError?.message);
  return [];
}
