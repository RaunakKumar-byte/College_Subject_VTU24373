import express from 'express';

import { requireAuth, requireRole } from '../middleware/auth.js';
import Booking from '../models/Booking.js';
import Event from '../models/Event.js';

const router = express.Router();

router.get('/me', requireAuth, requireRole('user'), async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate('event', 'name department dateTime venue ticketPrice')
    .sort({ createdAt: -1 });

  res.json(bookings);
});

router.get('/', requireAuth, requireRole('admin'), async (_req, res) => {
  const bookings = await Booking.find()
    .populate('event', 'name department dateTime venue ticketPrice')
    .sort({ createdAt: -1 });

  res.json(bookings);
});

router.post('/', requireAuth, requireRole('user'), async (req, res) => {
  const { eventId, name, email, department, ticketCount } = req.body || {};

  if (!eventId || !name || !email || !department || ticketCount === undefined) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const count = Number(ticketCount);
  if (!Number.isInteger(count) || count <= 0) {
    return res.status(400).json({ message: 'Ticket count must be a positive integer.' });
  }

  const event = await Event.findOneAndUpdate(
    { _id: eventId, availableTickets: { $gte: count } },
    { $inc: { availableTickets: -count } },
    { new: true }
  );

  if (!event) {
    return res.status(409).json({ message: 'Not enough tickets available.' });
  }

  const totalAmount = count * event.ticketPrice;
  const booking = await Booking.create({
    user: req.user.id,
    event: event._id,
    ticketCount: count,
    totalAmount,
    name: String(name).trim(),
    email: String(email).trim(),
    department: String(department).trim()
  });

  const populated = await Booking.findById(booking._id).populate(
    'event',
    'name department dateTime venue ticketPrice'
  );

  return res.status(201).json({
    booking: populated,
    event
  });
});

export default router;

