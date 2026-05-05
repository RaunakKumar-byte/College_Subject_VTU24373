import { useEffect, useMemo, useState } from 'react';

const initialForm = {
  name: '',
  email: '',
  department: '',
  ticketCount: '1'
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function BookingForm({
  eventName,
  availableTickets,
  ticketPrice,
  onBook,
  notification,
  emailStatus,
  clearNotification
}) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [pendingBooking, setPendingBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (notification || emailStatus) {
      const timer = setTimeout(() => clearNotification(), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, emailStatus, clearNotification]);

  const totalPreview = useMemo(() => {
    const ticketCount = Number(form.ticketCount) || 0;
    return ticketCount * ticketPrice;
  }, [form.ticketCount, ticketPrice]);

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Name is required.';
    if (!form.email.trim()) nextErrors.email = 'Email is required.';
    else if (!emailPattern.test(form.email)) nextErrors.email = 'Enter a valid email address.';
    if (!form.department.trim()) nextErrors.department = 'Department is required.';
    const count = Number(form.ticketCount);
    if (!form.ticketCount.trim()) nextErrors.ticketCount = 'Enter a ticket quantity.';
    else if (!Number.isInteger(count) || count <= 0) nextErrors.ticketCount = 'Ticket count must be a positive integer.';
    else if (count > availableTickets) nextErrors.ticketCount = 'Cannot book more tickets than available.';
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setOtpError('');

    if (Object.keys(nextErrors).length === 0) {
      const newOtp = generateOtp();
      setGeneratedOtp(newOtp);
      setPendingBooking({ ...form, otp: newOtp });
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setGeneratedOtp('');
    setOtpInput('');
    setOtpError('');
    setPendingBooking(null);
    clearNotification();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerifyOtp = async () => {
    if (!pendingBooking) {
      return;
    }

    if (!otpInput.trim()) {
      setOtpError('Enter the OTP sent for verification.');
      return;
    }

    if (otpInput !== generatedOtp) {
      setOtpError('Invalid OTP. Please check the generated OTP and try again.');
      return;
    }

    setIsSubmitting(true);
    setOtpError('');

    await onBook(pendingBooking);

    setForm(initialForm);
    setErrors({});
    setGeneratedOtp('');
    setOtpInput('');
    setPendingBooking(null);
    setIsSubmitting(false);
  };

  return (
    <div>
      <div className="panel-header">
        <div>
          <h2>Book Tickets</h2>
          <p className="micro-text">Reserve your seat for {eventName} before tickets run out.</p>
        </div>
        <span className="badge subtle-badge">{availableTickets} left</span>
      </div>

      <form className="booking-form" onSubmit={handleSubmit} noValidate>
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </label>

        <label>
          Email ID
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your college email"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </label>

        <label>
          Department
          <input
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Enter your department"
          />
          {errors.department && <span className="error-text">{errors.department}</span>}
        </label>

        <label>
          Number of Tickets
          <input
            name="ticketCount"
            type="number"
            min="1"
            value={form.ticketCount}
            onChange={handleChange}
          />
          {errors.ticketCount && <span className="error-text">{errors.ticketCount}</span>}
        </label>

        <div className="price-row">
          <strong>Price per ticket:</strong>
          <span>₹{ticketPrice}</span>
        </div>

        <div className="price-row">
          <strong>Total amount:</strong>
          <span>₹{totalPreview}</span>
        </div>

        {notification && <div className="success-alert">{notification}</div>}
        {emailStatus && <div className="info-alert">{emailStatus}</div>}

        {pendingBooking && (
          <div className="otp-card">
            <h3>OTP Verification</h3>
            <p className="micro-text">
              Demo OTP generated for this booking: <strong>{generatedOtp}</strong>
            </p>
            <label>
              Enter OTP
              <input
                name="otp"
                value={otpInput}
                onChange={(event) => setOtpInput(event.target.value)}
                placeholder="Enter 6-digit OTP"
              />
              {otpError && <span className="error-text">{otpError}</span>}
            </label>
            <button
              type="button"
              className="primary-btn verify-btn"
              onClick={handleVerifyOtp}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Verifying...' : 'Verify OTP & Confirm Booking'}
            </button>
          </div>
        )}

        <div className="button-row">
          <button type="submit" className="primary-btn">
            Generate OTP
          </button>
          <button type="button" className="secondary-btn" onClick={handleReset}>
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;
