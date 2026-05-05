import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';
import { createEvent, deleteEvent, getAllBookings, getEvents } from '../services/api.js';

const initialEventForm = {
  name: '',
  department: '',
  dateTime: '',
  venue: '',
  ticketPrice: '',
  totalTickets: ''
};

export default function AdminDashboard() {
  const { token, user } = useAuth();
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState(initialEventForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadAll = async () => {
    setIsLoading(true);
    setError('');
    try {
      const [evtList, bookingList] = await Promise.all([
        getEvents(),
        getAllBookings({ token })
      ]);
      setEvents(evtList);
      setBookings(bookingList);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return 'Event name is required.';
    if (!form.department.trim()) return 'Department is required.';
    if (!form.dateTime.trim()) return 'Date & time is required.';
    if (!form.venue.trim()) return 'Venue is required.';
    const price = Number(form.ticketPrice);
    if (!Number.isFinite(price) || price < 0) return 'Ticket price must be 0 or more.';
    const total = Number(form.totalTickets);
    if (!Number.isInteger(total) || total <= 0) return 'Total tickets must be a positive integer.';
    return '';
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const created = await createEvent({
        token,
        name: form.name,
        department: form.department,
        dateTime: form.dateTime,
        venue: form.venue,
        ticketPrice: Number(form.ticketPrice),
        totalTickets: Number(form.totalTickets)
      });

      setEvents((prev) => [created, ...prev]);
      setForm(initialEventForm);
      setSuccess('Event created successfully.');
    } catch (err) {
      setError(err.message || 'Failed to create event.');
    }
  };

  const handleDelete = async (id) => {
    setError('');
    setSuccess('');
    try {
      await deleteEvent({ token, id });
      setEvents((prev) => prev.filter((evt) => evt._id !== id));
      setSuccess('Event deleted.');
    } catch (err) {
      setError(err.message || 'Failed to delete event.');
    }
  };

  return (
    <main className="admin-shell">
      <header className="page-header">
        <div>
          <h2>Admin Dashboard</h2>
          <p className="micro-text">
            Welcome, <strong>{user?.name}</strong>. Create events and review all bookings.
          </p>
        </div>
        <button type="button" className="secondary-btn" onClick={loadAll} disabled={isLoading}>
          Refresh
        </button>
      </header>

      {error && <div className="error-alert">{error}</div>}
      {success && <div className="success-alert">{success}</div>}
      {isLoading && <div className="info-alert">Loading dashboard...</div>}

      <div className="page-grid admin-grid">
        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Create Event</h2>
              <p className="micro-text">Only Admin users can create events.</p>
            </div>
          </div>

          <form className="booking-form" onSubmit={handleCreate} noValidate>
            <label>
              Event Name
              <input name="name" value={form.name} onChange={handleChange} placeholder="Event name" />
            </label>

            <label>
              Department
              <input
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="Department name"
              />
            </label>

            <label>
              Date & Time
              <input
                name="dateTime"
                value={form.dateTime}
                onChange={handleChange}
                placeholder="e.g., June 20, 2026 · 10:00 AM"
              />
            </label>

            <label>
              Venue
              <input name="venue" value={form.venue} onChange={handleChange} placeholder="Venue" />
            </label>

            <label>
              Ticket Price
              <input
                name="ticketPrice"
                type="number"
                min="0"
                value={form.ticketPrice}
                onChange={handleChange}
                placeholder="e.g., 150"
              />
            </label>

            <label>
              Total Tickets
              <input
                name="totalTickets"
                type="number"
                min="1"
                value={form.totalTickets}
                onChange={handleChange}
                placeholder="e.g., 80"
              />
            </label>

            <button type="submit" className="primary-btn">
              Create Event
            </button>
          </form>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Created Events</h2>
              <p className="micro-text">Events stored in MongoDB.</p>
            </div>
            <span className="badge">{events.length} total</span>
          </div>

          {events.length === 0 ? (
            <div className="info-alert">No events created yet.</div>
          ) : (
            <div className="table-shell">
              {events.map((evt) => (
                <div key={evt._id} className="table-row">
                  <div className="table-main">
                    <strong>{evt.name}</strong>
                    <div className="micro-text">
                      {evt.department} · {evt.dateTime} · {evt.venue}
                    </div>
                    <div className="micro-text">
                      Price: ₹{evt.ticketPrice} · Available: {evt.availableTickets}/{evt.totalTickets}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="danger-btn"
                    onClick={() => handleDelete(evt._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>All Bookings</h2>
            <p className="micro-text">Visible to Admin only.</p>
          </div>
          <span className="badge">{bookings.length} bookings</span>
        </div>

        {bookings.length === 0 ? (
          <div className="info-alert">No bookings yet.</div>
        ) : (
          <div className="table-shell">
            {bookings.map((booking) => (
              <div key={booking._id} className="table-row">
                <div className="table-main">
                  <strong>
                    {booking.name} booked {booking.ticketCount} ticket(s)
                  </strong>
                  <div className="micro-text">
                    Event: {booking.event?.name} · Amount: ₹{booking.totalAmount}
                  </div>
                  <div className="micro-text">
                    Email: {booking.email} · Department: {booking.department}
                  </div>
                </div>
                <span className="badge subtle-badge">{new Date(booking.createdAt).toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

