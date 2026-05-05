function BookingSummary({ bookingSummary }) {
  return (
    <div className="summary-card">
      <h2>Booking Summary</h2>
      <div className="summary-row">
        <span>User Name</span>
        <strong>{bookingSummary.userName}</strong>
      </div>
      <div className="summary-row">
        <span>Event Name</span>
        <strong>{bookingSummary.eventName}</strong>
      </div>
      <div className="summary-row">
        <span>Email ID</span>
        <strong>{bookingSummary.email}</strong>
      </div>
      <div className="summary-row">
        <span>Department</span>
        <strong>{bookingSummary.department}</strong>
      </div>
      <div className="summary-row">
        <span>Tickets Booked</span>
        <strong>{bookingSummary.ticketsBooked}</strong>
      </div>
      <div className="summary-row">
        <span>Total Amount</span>
        <strong>₹{bookingSummary.totalAmount}</strong>
      </div>
      <div className="summary-row">
        <span>Verified OTP</span>
        <strong>{bookingSummary.otpVerified}</strong>
      </div>
      <div className="summary-row">
        <span>Booked At</span>
        <strong>{bookingSummary.bookedAt}</strong>
      </div>
    </div>
  );
}

export default BookingSummary;
