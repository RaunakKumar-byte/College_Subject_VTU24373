import { useEffect, useMemo, useState } from 'react';
import BookingForm from '../components/BookingForm.jsx';
import BookingSummary from '../components/BookingSummary.jsx';
import Chatbot from '../components/Chatbot.jsx';
import EventDetails from '../components/EventDetails.jsx';
import { useAuth } from '../auth/AuthContext.jsx';
import { createBooking, getEvents } from '../services/api.js';
import { sendBookingConfirmationEmail } from '../services/emailService.js';

export default function BookingPage() {
  const { token, user } = useAuth();
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [bookingSummary, setBookingSummary] = useState(null);
  const [notification, setNotification] = useState('');
  const [emailStatus, setEmailStatus] = useState('');
  const [pageError, setPageError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setIsLoading(true);
      setPageError('');
      try {
        const list = await getEvents();
        if (!isMounted) return;
        setEvents(list);
        setSelectedEventId(list[0]?._id || '');
      } catch (err) {
        if (!isMounted) return;
        setPageError(err.message || 'Unable to load events.');
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

  const selectedEvent = useMemo(
    () => events.find((evt) => evt._id === selectedEventId) || null,
    [events, selectedEventId]
  );

  const mapUrl = useMemo(() => {
    if (!selectedEvent?.venue) return '';
    const mapQuery = encodeURIComponent(`${selectedEvent.venue}, college campus`);
    return `https://maps.google.com/maps?q=${mapQuery}&output=embed`;
  }, [selectedEvent?.venue]);

  const handleBooking = async ({ name, email, department, ticketCount, otp }) => {
    if (!selectedEvent) {
      setNotification('Please select an event first.');
      return;
    }

    try {
      const result = await createBooking({
        token,
        eventId: selectedEvent._id,
        name,
        email,
        department,
        ticketCount
      });

      setEvents((prev) => prev.map((evt) => (evt._id === result.event._id ? result.event : evt)));

      const summary = {
        userName: name,
        email,
        department,
        eventName: result.booking.event.name,
        ticketsBooked: result.booking.ticketCount,
        totalAmount: result.booking.totalAmount,
        otpVerified: otp,
        bookedAt: new Date(result.booking.createdAt).toLocaleString()
      };

      setBookingSummary(summary);
      setNotification('Booking confirmed. Your OTP has been verified successfully.');

      const emailResult = await sendBookingConfirmationEmail({
        ...summary,
        venue: result.booking.event.venue,
        dateTime: result.booking.event.dateTime,
        contactEmail: 'events@college.edu'
      });
      setEmailStatus(emailResult.message);
    } catch (err) {
      setNotification(err.message || 'Booking failed.');
    }
  };

  const chatbotContext = selectedEvent
    ? {
        eventName: selectedEvent.name,
        eventTime: selectedEvent.dateTime,
        ticketPrice: selectedEvent.ticketPrice,
        availability: selectedEvent.availableTickets,
        venue: selectedEvent.venue,
        contactEmail: 'events@college.edu'
      }
    : {
        eventName: 'the event',
        eventTime: 'N/A',
        ticketPrice: 0,
        availability: 0,
        venue: 'N/A',
        contactEmail: 'events@college.edu'
      };

  return (
    <>
      <header className="page-header">
        <div>
          <h2>User Ticket Booking</h2>
          <p className="micro-text">
            Welcome, <strong>{user?.name}</strong>. Select an event and complete OTP verification to
            confirm booking.
          </p>
        </div>
        <div className="event-picker">
          <label className="field-label">Choose Event</label>
          <select
            className="select-input"
            value={selectedEventId}
            onChange={(event) => setSelectedEventId(event.target.value)}
            disabled={isLoading || events.length === 0}
          >
            {events.map((evt) => (
              <option key={evt._id} value={evt._id}>
                {evt.name} ({evt.availableTickets} left)
              </option>
            ))}
          </select>
        </div>
      </header>

      {pageError && <div className="error-alert">{pageError}</div>}
      {isLoading && <div className="info-alert">Loading events...</div>}
      {!isLoading && !selectedEvent && (
        <div className="info-alert">No events found. Ask an Admin to create an event.</div>
      )}

      {selectedEvent && (
        <>
          <main className="page-grid">
            <section className="panel">
              <EventDetails
                details={{
                  ...selectedEvent,
                  agenda: selectedEvent.agenda || ['Check-in', 'Main session', 'Q&A', 'Networking']
                }}
                mapUrl={mapUrl}
              />
            </section>

            <section className="panel booking-panel">
              <BookingForm
                eventName={selectedEvent.name}
                availableTickets={selectedEvent.availableTickets}
                ticketPrice={selectedEvent.ticketPrice}
                onBook={handleBooking}
                notification={notification}
                emailStatus={emailStatus}
                clearNotification={() => {
                  setNotification('');
                  setEmailStatus('');
                }}
              />

              {bookingSummary && <BookingSummary bookingSummary={bookingSummary} />}
            </section>
          </main>

          <section className="panel chatbot-panel">
            <Chatbot eventContext={chatbotContext} />
          </section>
        </>
      )}
    </>
  );
}

