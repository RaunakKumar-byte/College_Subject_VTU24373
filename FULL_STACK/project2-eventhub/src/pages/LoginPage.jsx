import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import { login } from '../services/api.js';

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.email.trim()) return 'Email is required.';
    if (!form.password) return 'Password is required.';
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await login({
        email: form.email,
        password: form.password
      });

      auth.login(result.token, result.user);
      navigate(result.user.role === 'admin' ? '/admin' : '/booking', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-shell">
      <section className="panel auth-panel">
        <h2>Login</h2>
        <p className="micro-text">Login to book tickets or manage events (Admin).</p>

        <form className="booking-form" onSubmit={handleSubmit} noValidate>
          <label>
            Email ID
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@college.edu"
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Your password"
            />
          </label>

          {error && <div className="error-alert">{error}</div>}

          <button type="submit" className="primary-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </section>
    </main>
  );
}

