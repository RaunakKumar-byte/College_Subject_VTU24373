function EventDetails({ details, mapUrl }) {
  return (
    <div>
      <div className="panel-header">
        <div>
          <h2>Event Details</h2>
          <p className="micro-text">Students and faculty can review event info before booking.</p>
        </div>
        <span className="badge">{details.availableTickets} tickets left</span>
      </div>
      <div className="detail-grid">
        <div>
          <p className="field-label">Event Name</p>
          <p>{details.name}</p>
        </div>
        <div>
          <p className="field-label">Department</p>
          <p>{details.department}</p>
        </div>
        <div>
          <p className="field-label">Date & Time</p>
          <p>{details.dateTime}</p>
        </div>
        <div>
          <p className="field-label">Venue</p>
          <p>{details.venue}</p>
        </div>
        <div>
          <p className="field-label">Ticket Price</p>
          <p>₹{details.ticketPrice}</p>
        </div>
        <div>
          <p className="field-label">Available Tickets</p>
          <p>{details.availableTickets}</p>
        </div>
      </div>

      <div className="agenda-card">
        <p className="field-label">Event Highlights</p>
        <ul className="agenda-list">
          {details.agenda.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="map-card">
        <p className="field-label">Venue Location</p>
        <iframe
          title="Venue Location"
          src={mapUrl}
          frameBorder="0"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default EventDetails;
