# 🎯 Migration Guide - Modernizing Existing Components

This guide shows how to update your existing components to use the new modern design system.

---

## 🔄 Component Migration Examples

### 1️⃣ Buttons

#### BEFORE
```jsx
<button className="primary-btn">Book Event</button>
<button className="secondary-btn">Cancel</button>
<button className="danger-btn">Delete</button>
```

#### AFTER
```jsx
<button className="btn btn-primary">Book Event</button>
<button className="btn btn-ghost">Cancel</button>
<button className="btn btn-danger">Delete</button>
```

#### With Sizes
```jsx
<button className="btn btn-primary btn-sm">Small</button>
<button className="btn btn-primary">Normal</button>
<button className="btn btn-primary btn-lg">Large</button>
<button className="btn btn-primary btn-block">Full Width</button>
```

---

### 2️⃣ Forms

#### BEFORE
```jsx
<label>
  Email
  <input 
    name="email" 
    type="email" 
    value={email}
    onChange={handleChange}
  />
</label>

{error && <div className="error-alert">{error}</div>}
```

#### AFTER
```jsx
<div className="form-group">
  <label className="form-label">Email Address</label>
  <input 
    className={`input ${error ? 'error' : ''}`}
    name="email" 
    type="email" 
    value={email}
    onChange={handleChange}
    placeholder="name@example.com"
  />
  {error && <div className="form-error">❌ {error}</div>}
  {!error && <p className="form-help">We'll never share your email</p>}
</div>
```

#### With Validation States
```jsx
{/* Error State */}
<input className="input error" type="email" />
<div className="form-error">❌ Invalid email format</div>

{/* Success State */}
<input className="input success" type="email" />
<div className="form-success">✓ Email verified</div>

{/* Help Text */}
<p className="form-help">Password must be at least 8 characters</p>
```

---

### 3️⃣ Cards

#### BEFORE
```jsx
<div className="panel">
  <div className="panel-header">
    <h3>Event Title</h3>
  </div>
  <div className="table-main">
    <strong>Event Name</strong>
    <div className="micro-text">Details here</div>
  </div>
</div>
```

#### AFTER
```jsx
<div className="card">
  <div className="card-header">
    <h3 className="card-title">Event Title</h3>
    <span className="badge badge-primary">New</span>
  </div>
  <div className="card-body">
    <p>Card content goes here...</p>
  </div>
  <div className="card-footer">
    <button className="btn btn-primary">Action</button>
  </div>
</div>
```

#### Event Card (Modern)
```jsx
<div className="event-card">
  <div className="event-card-header">
    <h3>{event.name}</h3>
    <span className="event-ticket-badge">{event.availableTickets} left</span>
  </div>
  <div className="event-card-body">
    <div className="event-meta">
      <span className="event-dept">{event.department}</span>
      <span className="event-price">₹{event.ticketPrice}</span>
    </div>
    
    <div className="event-detail">
      <strong>📅 Date</strong>
      <p>{event.dateTime}</p>
    </div>
    
    <div className="event-detail">
      <strong>📍 Venue</strong>
      <p>{event.venue}</p>
    </div>
  </div>
  <div className="event-card-footer">
    <button className="btn btn-primary btn-block">Book Event</button>
  </div>
</div>
```

---

### 4️⃣ Alerts

#### BEFORE
```jsx
{error && <div className="error-alert">{error}</div>}
{success && <div className="success-alert">{success}</div>}
```

#### AFTER
```jsx
{/* Using direct alert classes */}
<div className="alert alert-danger">
  ✕ {error}
</div>

<div className="alert alert-success">
  ✓ {success}
</div>

<div className="alert alert-warning">
  ⚠ This action cannot be undone
</div>

<div className="alert alert-info">
  ℹ Please review before proceeding
</div>
```

#### With Toast (Better UX)
```jsx
import { useToast } from '@/components/Toast';

function MyComponent() {
  const toast = useToast();
  
  const handleSubmit = async () => {
    try {
      await submitForm();
      toast.success('Form submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit form');
    }
  };
  
  // Toast automatically appears and disappears
  // No need to manage state!
}
```

---

### 5️⃣ Badge/Label

#### BEFORE
```jsx
<span className="badge subtle-badge">{status}</span>
<span className="badge">{count} bookings</span>
```

#### AFTER
```jsx
{/* Semantic badges */}
<span className="badge badge-primary">New</span>
<span className="badge badge-success">Active</span>
<span className="badge badge-warning">Pending</span>
<span className="badge badge-danger">Critical</span>

{/* With icons */}
<span className="badge badge-primary">
  ✓ Active
</span>
```

---

### 6️⃣ Loading States

#### BEFORE
```jsx
{isLoading && <div className="info-alert">Loading...</div>}
```

#### AFTER
```jsx
import { LoadingSpinner, LoadingSkeleton } from '@/components/Loading';

{/* Simple spinner */}
{isLoading && <LoadingSpinner size="md" />}

{/* Loading skeleton for cards */}
{isLoading && <LoadingSkeleton />}

{/* Full page overlay */}
{isLoading && <PageLoader />}
```

---

### 7️⃣ Layout & Spacing

#### BEFORE
```jsx
<div className="page-grid">
  <div className="panel">Left</div>
  <div className="panel">Right</div>
</div>
```

#### AFTER
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="card">Left</div>
  <div className="card">Right</div>
</div>

{/* More explicit with utilities */}
<div className="flex gap-4 p-6">
  <button className="btn btn-primary">Action</button>
  <button className="btn btn-ghost">Cancel</button>
</div>
```

#### Responsive Grid Examples
```jsx
{/* 1 col on mobile, 2 on tablet, 3 on desktop */}
<div className="grid grid-cols-3">
  {items.map(item => <div key={item.id}>{item}</div>)}
</div>

{/* Custom gaps and padding */}
<div className="grid gap-8 p-8">
  {/* Your cards */}
</div>
```

---

### 8️⃣ Typography

#### BEFORE
```jsx
<h2>Page Title</h2>
<p className="micro-text">Small text description</p>
```

#### AFTER
```jsx
<h2>Page Title</h2>
<p className="text-muted text-sm">Small text description</p>

{/* Text styling */}
<p className="text-primary">Primary color text</p>
<p className="text-danger">Error message</p>
<p className="text-muted">Muted/secondary text</p>
<p className="text-bold">Bold text</p>
<p className="text-center">Centered text</p>
```

---

## 📋 Full Component Example: Modern Login Page

### BEFORE
```jsx
export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      const result = await login(form);
      // Success
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-shell">
      <section className="panel auth-panel">
        <h2>Login</h2>
        <p className="micro-text">Enter your credentials</p>

        <form className="booking-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
            />
          </label>

          {error && <div className="error-alert">{error}</div>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </section>
    </main>
  );
}
```

### AFTER (Modern)
```jsx
import { useState } from 'react';
import { useToast } from '@/components/Toast';
import { LoadingSpinner } from '@/components/Loading';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    
    try {
      const result = await login(form);
      toast.success('Login successful! Redirecting...');
      // Navigate after success
    } catch (err) {
      toast.error(err.message || 'Login failed');
      setErrors({ submit: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container flex-center p-6">
      <div className="card" style={{ maxWidth: '420px', width: '100%' }}>
        <div className="card-header">
          <h2 className="card-title">Welcome Back</h2>
          <p className="text-muted">Sign in to your account</p>
        </div>

        <div className="card-body">
          <form className="booking-form" onSubmit={handleSubmit} noValidate>
            
            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className={`input ${errors.email ? 'error' : ''}`}
                name="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                placeholder="name@company.com"
                disabled={isSubmitting}
              />
              {errors.email && (
                <div className="form-error">❌ {errors.email}</div>
              )}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className={`input ${errors.password ? 'error' : ''}`}
                name="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
                placeholder="••••••••"
                disabled={isSubmitting}
              />
              {errors.password && (
                <div className="form-error">❌ {errors.password}</div>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn btn-primary btn-block"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-muted text-sm">
              Don't have an account?{' '}
              <a href="/signup" className="text-primary font-semibold">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
```

---

## ✅ Migration Checklist

- [ ] Update all button classes: `primary-btn` → `btn btn-primary`
- [ ] Update all form labels: Add `form-label` class
- [ ] Update all inputs: Add `input` class
- [ ] Replace `.panel` with `.card` and add `.card-header`, `.card-body`, `.card-footer`
- [ ] Update alerts to use new structure with icons
- [ ] Add form validation visual feedback
- [ ] Replace loading text with LoadingSpinner component
- [ ] Update toast notifications (remove setState, use useToast)
- [ ] Apply responsive grid classes
- [ ] Test dark mode on all pages
- [ ] Test on mobile devices

---

## 🎨 Quick CSS Class Reference

```
Buttons:        btn btn-primary | btn-secondary | btn-ghost | btn-outline
Forms:          input | select | textarea | form-label | form-error | form-success
Cards:          card | card-header | card-title | card-body | card-footer
Alerts:         alert alert-success | alert-danger | alert-warning | alert-info
Badges:         badge badge-primary | badge-success | badge-danger | badge-warning
Text:           text-primary | text-muted | text-sm | text-lg | text-bold
Layout:         flex | flex-col | grid | grid-cols-2 | gap-4 | p-6 | m-4
Spacing:        p-4 | m-4 | gap-6
Rounded:        rounded | rounded-lg | rounded-xl | rounded-full
Shadows:        shadow | shadow-lg | shadow-glow
Animations:     animate-fade | animate-slide-up | animate-pulse | animate-spin
```

---

## 🚀 Start Migrating!

Begin with one page at a time:
1. LoginPage
2. SignupPage
3. BookingPage
4. AdminDashboard
5. ProfilePage
6. MyBookingsPage
7. EventsDashboard

Each migration should take ~30 minutes and result in a much more modern, polished appearance!
