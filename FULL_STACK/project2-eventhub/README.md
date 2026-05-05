# EventHub Ticket Booking

A React + Vite web application for booking tickets for an internal department event such as a seminar or technical fest.

## Features
- Event details module with event name, department, date/time, venue, price, availability, and highlights
- Ticket booking form with required-field validation and overbooking prevention
- OTP verification flow before final booking confirmation
- Dynamic ticket count updates with booking summary
- Embedded Google Map for venue location
- FAQ chatbot for timing, pricing, venue, availability, and organizer contact
- Optional EmailJS integration for booking confirmation emails
- Local storage sync so ticket availability updates across browser tabs

## Tech Stack
- React functional components
- JSX
- `useState`, `useEffect`, and conditional rendering
- Vite
- EmailJS browser SDK

## Run Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the browser at the local URL shown in the terminal.

## Fullstack Setup (Auth + Admin Dashboard)
This project includes a backend API in `backend/` using Node.js + Express + MongoDB.

### 1) Backend
1. Create `backend/.env` using `backend/.env.example`:
   - Set `MONGO_URI` to your MongoDB connection string
   - Set `JWT_SECRET` to a long random secret
2. Start the backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

Backend will run on `http://localhost:5000`.

### 2) Frontend
Start the frontend:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`.

### 3) Demo Flow
- Signup as **Admin** → redirected to **Admin Dashboard** (`/admin`) → create an event
- Signup as **User** → redirected to **Booking Page** (`/booking`) → select the created event → book tickets with OTP verification
- Admin can refresh and view all bookings on the dashboard

## Optional EmailJS Setup
To enable confirmation emails, create a `.env` file in the project root and add:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

If these values are not configured, bookings will still work and the app will show a clear fallback message.

## Optional Frontend API URL
If your backend runs on a different host/port, set:

```env
VITE_API_URL=http://localhost:5000/api
```
