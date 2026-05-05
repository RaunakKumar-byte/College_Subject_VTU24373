import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import { signup } from '../services/api.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return 'Name is required.';
    if (!form.email.trim()) return 'Email is required.';
    if (!emailPattern.test(form.email)) return 'Enter a valid email address.';
    if (!form.password) return 'Password is required.';
    if (form.password.length < 8) return 'Password must be at least 8 characters long.';
    if (!form.role) return 'Role is required.';
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
      const result = await signup({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role
      });

      auth.login(result.token, result.user);
      navigate(result.user.role === 'admin' ? '/admin' : '/booking', { replace: true });
    } catch (err) {
      setError(err.message || 'Signup failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-shell">
      <section className="panel auth-panel">
        <h2>Create Account</h2>
        <p className="micro-text">Signup as a User (booking) or Admin (event management).</p>

        <form className="booking-form" onSubmit={handleSubmit} noValidate>
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" />
          </label>

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
              placeholder="Minimum 8 characters"
            />
          </label>

          <label>
            Role
            <select name="role" value={form.role} onChange={handleChange} className="select-input">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          {error && <div className="error-alert">{error}</div>}

          <button type="submit" className="primary-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Signup'}
          </button>
        </form>
      </section>
    </main>
  );
}

