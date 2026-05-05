import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';
import { getMyBookings } from '../services/api.js';

export default function MyBookingsPage() {
  const { token, user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadBookings() {
      setIsLoading(true);
      setError('');
      try {
        const result = await getMyBookings({ token });
        if (!isMounted) return;
        setBookings(result);
      } catch (err) {
        if (!isMounted) return;
        setError(err.message || 'Unable to load your bookings.');
      } finally {
        if (!isMounted) return;
        setIsLoading(false);
      }
    }

    loadBookings();
    return () => {
      isMounted = false;
    };
  }, [token]);

  return (
    <div className="app-shell">
      <header className="page-header">
        <div>
          <h2>My Bookings</h2>
          <p className="micro-text">Bookings for <strong>{user?.name}</strong>. Track ticket reservations and event details in one place.</p>
        </div>
      </header>

      <section className="panel">
        {error && <div className="error-alert">{error}</div>}
        {isLoading && <div className="info-alert">Loading your bookings...</div>}
        {!isLoading && bookings.length === 0 && <div className="info-alert">No bookings found yet. Book an event to see it here.</div>}

        {!isLoading && bookings.length > 0 && (
          <div className="table-shell">
            {bookings.map((booking) => (
              <div key={booking._id} className="table-row">
                <div className="table-main">
                  <strong>{booking.event.name}</strong>
                  <p>{booking.event.department} · {booking.event.venue}</p>
                  <p>{new Date(booking.createdAt).toLocaleString()}</p>
                  <p>Tickets: {booking.ticketCount} · Paid: ₹{booking.totalAmount}</p>
                </div>
                <div className="badge">{booking.event.dateTime}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
