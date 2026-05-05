const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, { method = 'GET', token, body } = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    const message = data?.message || 'Request failed.';
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return data;
}

export function signup(payload) {
  return request('/auth/signup', { method: 'POST', body: payload });
}

export function login(payload) {
  return request('/auth/login', { method: 'POST', body: payload });
}

export function getEvents() {
  return request('/events');
}

export function getMyBookings({ token }) {
  return request('/bookings/me', { token });
}

export function createEvent({ token, ...payload }) {
  return request('/events', { method: 'POST', token, body: payload });
}

export function deleteEvent({ token, id }) {
  return request(`/events/${id}`, { method: 'DELETE', token });
}

export function createBooking({ token, ...payload }) {
  return request('/bookings', { method: 'POST', token, body: payload });
}

export function getAllBookings({ token }) {
  return request('/bookings', { token });
}

