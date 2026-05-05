import { useState } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setStatus('');

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Name cannot be empty.');
      return;
    }

    setIsSaving(true);
    try {
      updateUser({ name: trimmedName });
      setStatus('Profile updated locally. Refresh or re-login to persist session state.');
    } catch (err) {
      setError(err.message || 'Unable to save profile.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="auth-shell">
      <section className="panel auth-panel">
        <h2>My Profile</h2>
        <p className="micro-text">Review your account details and update the display name.</p>

        <form className="booking-form" onSubmit={handleSubmit} noValidate>
          <label>
            Full name
            <input
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
            />
          </label>

          <label>
            Email ID
            <input name="email" value={user?.email || ''} disabled />
          </label>

          <label>
            Role
            <input name="role" value={user?.role || ''} disabled />
          </label>

          {error && <div className="error-alert">{error}</div>}
          {status && <div className="success-alert">{status}</div>}

          <button type="submit" className="primary-btn" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </section>
    </main>
  );
}
