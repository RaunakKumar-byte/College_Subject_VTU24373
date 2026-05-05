import emailjs from '@emailjs/browser';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export async function sendBookingConfirmationEmail(booking) {
  if (!serviceId || !templateId || !publicKey) {
    return {
      status: 'skipped',
      message:
        'Booking saved. EmailJS credentials are not configured yet, so confirmation email was skipped.'
    };
  }

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        to_name: booking.userName,
        to_email: booking.email,
        event_name: booking.eventName,
        ticket_count: booking.ticketsBooked,
        total_amount: booking.totalAmount,
        venue: booking.venue,
        event_time: booking.dateTime,
        organizer_email: booking.contactEmail
      },
      {
        publicKey
      }
    );

    return {
      status: 'sent',
      message: 'Booking confirmed and a confirmation email has been sent.'
    };
  } catch {
    return {
      status: 'error',
      message: 'Booking confirmed, but the confirmation email could not be sent.'
    };
  }
}
