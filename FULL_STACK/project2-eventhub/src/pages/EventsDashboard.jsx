import { useEffect, useState } from 'react';
import { getEvents } from '../services/api.js';

export default function EventsDashboard() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterDept, setFilterDept] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setIsLoading(true);
      setError('');
      try {
        const list = await getEvents();
        if (!isMounted) return;
        setEvents(list);
      } catch (err) {
        if (!isMounted) return;
        setError(err.message || 'Unable to load events.');
      } finally {
        if (!isMounted) return;
        setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const departments = [...new Set(events.map((evt) => evt.department))];
  const filtered = filterDept ? events.filter((evt) => evt.department === filterDept) : events;

  return (
    <div className="app-shell">
      <header className="page-header">
        <div>
          <h2>Events Directory</h2>
          <p className="micro-text">Explore all upcoming events hosted by your college departments.</p>
        </div>
      </header>

      {error && <div className="error-alert">{error}</div>}
      {isLoading && <div className="info-alert">Loading events...</div>}

      {!isLoading && events.length > 0 && (
        <div className="filter-bar">
          <label htmlFor="dept-filter" className="field-label">Filter by Department</label>
          <select
            id="dept-filter"
            className="select-input"
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <div className="panel">
          <div className="info-alert">
            {events.length === 0
              ? 'No events published yet. Check back soon!'
              : `No events found in ${filterDept} department.`}
          </div>
        </div>
      )}

      {!isLoading && filtered.length > 0 && (
        <div className="events-grid">
          {filtered.map((evt) => (
            <div key={evt._id} className="event-card">
              <div className="event-card-header">
                <h3>{evt.name}</h3>
                <span className="event-ticket-badge">{evt.availableTickets} left</span>
              </div>

              <div className="event-card-body">
                <div className="event-meta">
                  <span className="event-dept">{evt.department}</span>
                  <span className="event-price">₹{evt.ticketPrice}</span>
                </div>

                <div className="event-detail">
                  <strong>📅 Date & Time</strong>
                  <p>{evt.dateTime}</p>
                </div>

                <div className="event-detail">
                  <strong>📍 Venue</strong>
                  <p>{evt.venue}</p>
                </div>

                <div className="event-detail">
                  <strong>🎟️ Ticket Status</strong>
                  <div className="ticket-bar">
                    <div
                      className="ticket-filled"
                      style={{
                        width: `${((evt.totalTickets - evt.availableTickets) / evt.totalTickets) * 100}%`
                      }}
                    />
                  </div>
                  <p className="ticket-text">{evt.totalTickets - evt.availableTickets} / {evt.totalTickets} booked</p>
                </div>
              </div>

              <div className="event-card-footer">
                <a href="/booking" className="primary-btn">Book Now</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
