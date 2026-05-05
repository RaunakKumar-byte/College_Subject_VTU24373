import express from 'express';

import { requireAuth, requireRole } from '../middleware/auth.js';
import Event from '../models/Event.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const events = await Event.find().sort({ createdAt: -1 });
  res.json(events);
});

router.post('/', requireAuth, requireRole('admin'), async (req, res) => {
  const { name, department, dateTime, venue, ticketPrice, totalTickets } = req.body || {};

  if (!name || !department || !dateTime || !venue || ticketPrice === undefined || totalTickets === undefined) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const price = Number(ticketPrice);
  const total = Number(totalTickets);
  if (!Number.isFinite(price) || price < 0) {
    return res.status(400).json({ message: 'Ticket price must be a valid number (0 or more).' });
  }
  if (!Number.isInteger(total) || total <= 0) {
    return res.status(400).json({ message: 'Total tickets must be a positive integer.' });
  }

  const event = await Event.create({
    name: String(name).trim(),
    department: String(department).trim(),
    dateTime: String(dateTime).trim(),
    venue: String(venue).trim(),
    ticketPrice: price,
    totalTickets: total,
    availableTickets: total,
    createdBy: req.user.id
  });

  res.status(201).json(event);
});

router.put('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  const { id } = req.params;
  const { name, department, dateTime, venue, ticketPrice, totalTickets, availableTickets } = req.body || {};

  const update = {};
  if (name !== undefined) update.name = String(name).trim();
  if (department !== undefined) update.department = String(department).trim();
  if (dateTime !== undefined) update.dateTime = String(dateTime).trim();
  if (venue !== undefined) update.venue = String(venue).trim();

  if (ticketPrice !== undefined) {
    const price = Number(ticketPrice);
    if (!Number.isFinite(price) || price < 0) {
      return res.status(400).json({ message: 'Ticket price must be a valid number (0 or more).' });
    }
    update.ticketPrice = price;
  }

  if (totalTickets !== undefined) {
    const total = Number(totalTickets);
    if (!Number.isInteger(total) || total <= 0) {
      return res.status(400).json({ message: 'Total tickets must be a positive integer.' });
    }
    update.totalTickets = total;
  }

  if (availableTickets !== undefined) {
    const available = Number(availableTickets);
    if (!Number.isInteger(available) || available < 0) {
      return res.status(400).json({ message: 'Available tickets must be 0 or more.' });
    }
    update.availableTickets = available;
  }

  const updated = await Event.findByIdAndUpdate(id, update, { new: true });
  if (!updated) {
    return res.status(404).json({ message: 'Event not found.' });
  }

  return res.json(updated);
});

router.delete('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  const { id } = req.params;
  const deleted = await Event.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ message: 'Event not found.' });
  }
  return res.json({ ok: true });
});

export default router;

