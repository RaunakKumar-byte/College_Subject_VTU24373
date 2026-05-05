import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import User from './models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      const allowedOrigins = [process.env.CLIENT_ORIGIN, 'http://localhost:5173', 'http://localhost:5137'].filter(Boolean);
      const isAllowed = allowedOrigins.includes(origin) || /^https?:\/\/localhost:\d+$/.test(origin);

      callback(isAllowed ? null : new Error(`CORS origin not allowed: ${origin}`), isAllowed);
    },
    credentials: true
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

async function start() {
  if (!mongoUri) {
    throw new Error('Missing MONGO_URI in backend/.env');
  }

  await mongoose.connect(mongoUri);
  console.log('MongoDB connected');

  const userCollection = mongoose.connection.collection('users');
  const indexes = await userCollection.indexes();
  const phoneIndex = indexes.find((index) => index.name === 'phone_1');
  if (phoneIndex && !phoneIndex.sparse) {
    console.log('Dropping legacy phone_1 index to allow signup without phone values.');
    await userCollection.dropIndex('phone_1');
  }

  app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});

