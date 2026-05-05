import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

const router = express.Router();

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function signToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body || {};

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: 'Enter a valid email address.' });
  }

  if (String(password).length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
  }

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role.' });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(409).json({ message: 'Email is already registered.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      role
    });

    const token = signToken(user);
    return res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    if (error.code === 11000) {
      const key = Object.keys(error.keyValue || {})[0] || 'email';
      const message = key === 'email' ? 'Email is already registered.' : 'Duplicate user data detected.';
      return res.status(409).json({ message });
    }
    throw error;
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = await User.findOne({ email: String(email).toLowerCase().trim() });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  if (!user.passwordHash && !user.password) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  let ok = false;
  if (user.passwordHash) {
    ok = await bcrypt.compare(password, user.passwordHash);
  } else {
    ok = password === user.password;
  }

  if (!ok) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  if (!user.passwordHash && user.password) {
    user.passwordHash = await bcrypt.hash(password, 10);
    user.password = undefined;
    await user.save();
  }

  const token = signToken(user);
  return res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
});

export default router;

