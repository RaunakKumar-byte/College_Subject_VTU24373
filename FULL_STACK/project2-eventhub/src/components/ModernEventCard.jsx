export default function ModernEventCard({ event, onBook }) {
  return (
    <div className="event-card">
      <div className="event-card-header">
        <h3>{event.name}</h3>
        <span className="event-ticket-badge">{event.availableTickets} left</span>
      </div>

      <div className="event-card-body">
        <div className="event-meta">
          <span className="event-dept">{event.department}</span>
          <span className="event-price">₹{event.ticketPrice}</span>
        </div>

        <div className="event-detail">
          <strong>📅 Date & Time</strong>
          <p>{event.dateTime}</p>
        </div>

        <div className="event-detail">
          <strong>📍 Venue</strong>
          <p>{event.venue}</p>
        </div>

        <div className="event-detail">
          <strong>🎟️ Ticket Availability</strong>
          <div className="ticket-bar">
            <div
              className="ticket-filled"
              style={{
                width: `${((event.totalTickets - event.availableTickets) / event.totalTickets) * 100}%`
              }}
            />
          </div>
          <p className="ticket-text">{event.totalTickets - event.availableTickets} / {event.totalTickets} booked</p>
        </div>
      </div>

      <div className="event-card-footer">
        <button className="btn btn-primary btn-block" onClick={() => onBook?.(event)}>
          Book Event
        </button>
      </div>
    </div>
  );
}
