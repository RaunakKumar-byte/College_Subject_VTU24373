import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './auth/AuthContext.jsx';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import Footer from './components/Footer.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import BookingPage from './pages/BookingPage.jsx';
import EventsDashboard from './pages/EventsDashboard.jsx';
import LoginPage from './pages/LoginPage.jsx';
import MyBookingsPage from './pages/MyBookingsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SignupPage from './pages/SignupPage.jsx';

function HomeRedirect() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Navigate to={user?.role === 'admin' ? '/admin' : '/booking'} replace />;
}

function TopNav() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">Internal Department Event Booking</p>
        <h1>EventHub</h1>
        <p className="subtitle">Role-based booking portal with Admin Dashboard.</p>
      </div>

      <div className="nav-actions">
        <ThemeToggle />
        {!isAuthenticated ? (
          <>
            <Link className="btn btn-ghost" to="/events">
              Browse Events
            </Link>
            <Link className="btn btn-ghost" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary" to="/signup">
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link className="btn btn-ghost" to="/events">
              Browse Events
            </Link>
            {user?.role === 'user' && (
              <>
                <Link className="btn btn-ghost" to="/booking">
                  Booking
                </Link>
                <Link className="btn btn-ghost" to="/my-bookings">
                  My Bookings
                </Link>
              </>
            )}
            <Link className="btn btn-ghost" to="/profile">
              Profile
            </Link>
            <span className="nav-user">
              Signed in as <strong>{user?.name}</strong> ({user?.role})
            </span>
            <button type="button" className="btn btn-ghost" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopNav />

      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/events" element={<EventsDashboard />} />

        <Route
          path="/booking"
          element={
            <ProtectedRoute role="user">
              <BookingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute role="user">
              <MyBookingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
