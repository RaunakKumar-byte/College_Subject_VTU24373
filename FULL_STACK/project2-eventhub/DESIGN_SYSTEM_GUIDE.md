/* MODERN UI/UX DESIGN SYSTEM - USAGE GUIDE */

/* ============================================
   SETUP & CONFIGURATION
   ============================================

1. The design system is in: src/styles/design-system.css
2. It's imported in src/styles.css
3. Theme toggle is available in: src/components/ThemeToggle.jsx
4. To use in components, import the CSS and use the class names

============================================ */

/* ============================================
   COLOR SYSTEM
   ============================================ */

/*
Primary Colors:
- --primary: #6366f1 (Main brand color)
- --primary-dark: #4f46e5
- --primary-light: #818cf8
- --primary-lighter: #e0e7ff

Secondary Colors:
- --secondary: #ec4899
- --secondary-dark: #be185d
- --secondary-light: #f472b6

Semantic Colors:
- --success: #10b981 (Success/Valid state)
- --warning: #f59e0b (Warning state)
- --danger: #ef4444 (Error/Danger state)

Neutral Palette:
- --neutral-900: #0f172a (Darkest)
- --neutral-800, 700, 600, 500, 400, 300, 200, 100, 50

Usage:
color: var(--primary);
background: var(--success);
border: 1px solid var(--neutral-300);
*/

/* ============================================
   TYPOGRAPHY
   ============================================ */

/*
Font Family: 'Inter', 'Segoe UI', etc.

Heading Hierarchy:
h1 - 3.5rem (gradient effect applied)
h2 - 2.25rem
h3 - 1.875rem
h4 - 1.5rem
h5 - 1.25rem
h6 - 1rem

Usage:
<h1>Main Title</h1>
<h2>Heading 2</h2>
<p>Paragraph text...</p>

Text Utilities:
.text-primary - Primary color text
.text-secondary - Secondary color text
.text-danger - Danger color text
.text-muted - Muted gray text
.text-bold - Bold weight
.text-sm - Small font size
.text-lg - Large font size
.text-center - Center align
*/

/* ============================================
   BUTTONS
   ============================================ */

/*
All buttons use the base .btn class

BUTTON VARIANTS:
1. .btn-primary (Blue gradient)
2. .btn-secondary (Pink gradient)
3. .btn-outline (Outlined style)
4. .btn-ghost (Ghost style)
5. .btn-success (Green)
6. .btn-danger (Red)

SIZE VARIANTS:
.btn-sm - Small button
.btn-lg - Large button
.btn-block - Full width

USAGE IN JSX:
<button className="btn btn-primary">Click Me</button>
<button className="btn btn-secondary btn-lg">Large Button</button>
<button className="btn btn-outline">Outline Button</button>
<a href="#" className="btn btn-ghost">Link as Button</a>

STATES:
- All buttons have hover, active, and disabled states
- Smooth transitions and transforms
- Box shadows that change on hover
*/

/* ============================================
   CARDS & CONTAINERS
   ============================================ */

/*
CARD USAGE:
<div className="card">
  <div className="card-header">
    <h2 className="card-title">Card Title</h2>
  </div>
  <div className="card-body">
    Content here...
  </div>
  <div className="card-footer">
    <button className="btn btn-primary">Action</button>
  </div>
</div>

FEATURES:
- Hover animation (translateY -4px)
- Border color change on hover
- Shadow elevation
- Responsive padding

EVENT CARD (Modern):
<div className="event-card">
  <div className="event-card-header">
    <h3>Event Name</h3>
    <span className="event-ticket-badge">50 left</span>
  </div>
  <div className="event-card-body">
    <!-- Event details -->
  </div>
  <div className="event-card-footer">
    <button className="btn btn-primary btn-block">Book Now</button>
  </div>
</div>
*/

/* ============================================
   FORMS & INPUTS
   ============================================ */

/*
FORM GROUP:
<div className="form-group">
  <label className="form-label">Email Address</label>
  <input type="email" className="input" placeholder="your@email.com" />
  <p className="form-help">We'll never share your email.</p>
</div>

VALIDATION STATES:
<input className="input error" type="email" />
<div className="form-error">❌ Email is invalid</div>

<input className="input success" type="email" />
<div className="form-success">✓ Email verified</div>

INPUT TYPES:
.input - Text input
.select - Dropdown select
.textarea - Multi-line textarea

FEATURES:
- Smooth focus transitions
- Color-coded borders for validation
- Custom dropdown styling
- Keyboard accessible
*/

/* ============================================
   ALERTS & BADGES
   ============================================ */

/*
ALERT TYPES:
<div className="alert alert-success">
  ✓ Operation completed successfully!
</div>

<div className="alert alert-danger">
  ✕ An error occurred. Please try again.
</div>

<div className="alert alert-warning">
  ⚠ Warning: Take caution with this action.
</div>

<div className="alert alert-info">
  ℹ This is an informational message.
</div>

BADGES:
<span className="badge badge-primary">Badge Label</span>
<span className="badge badge-secondary">New</span>
<span className="badge badge-success">Active</span>
<span className="badge badge-danger">Critical</span>

FEATURES:
- Color-coded styling
- Smooth animations
- Icon support (include SVG or emoji)
*/

/* ============================================
   SPACING & LAYOUT
   ============================================ */

/*
SPACING SCALE:
--space-0: 0
--space-1: 0.25rem (4px)
--space-2: 0.5rem (8px)
--space-3: 0.75rem (12px)
--space-4: 1rem (16px)
--space-6: 1.5rem (24px)
--space-8: 2rem (32px)
--space-12: 3rem (48px)
--space-16: 4rem (64px)
--space-20: 5rem (80px)
--space-24: 6rem (96px)

UTILITY CLASSES:
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.m-4 { margin: 1rem; }

.gap-2 { gap: 0.5rem; }
.gap-4 { gap: 1rem; }
.gap-6 { gap: 1.5rem; }

FLEXBOX UTILITIES:
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-center { display: flex; align-items: center; justify-content: center; }
.flex-between { display: flex; justify-content: space-between; align-items: center; }

GRID UTILITIES:
.grid { display: grid; gap: 1.5rem; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }

Responsive Grids adjust automatically on mobile!
*/

/* ============================================
   ANIMATIONS & EFFECTS
   ============================================ */

/*
GLASS MORPHISM:
<div className="glass">
  <!-- Content -->
</div>

GRADIENT BACKGROUNDS:
<div className="gradient-primary">Primary Gradient</div>
<div className="gradient-secondary">Secondary Gradient</div>
<div className="gradient-accent">Accent Gradient</div>

TEXT GRADIENTS:
<h1 className="text-gradient">Gradient Text</h1>

SHADOWS:
.shadow-sm { box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); }
.shadow { box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); }
.shadow-md { box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1); }
.shadow-lg { box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25); }
.shadow-glow { box-shadow: 0 0 30px rgba(99, 102, 241, 0.3); }

ANIMATIONS:
.animate-fade { Fade in }
.animate-slide-down { Slide down from top }
.animate-slide-up { Slide up from bottom }
.animate-slide-left { Slide from left }
.animate-slide-right { Slide from right }
.animate-pulse { Pulsing effect }
.animate-spin { Spinning loader }

TRANSITIONS:
--transition-fast: 150ms ease
--transition: 300ms ease
--transition-slow: 500ms ease
*/

/* ============================================
   ROUNDED CORNERS
   ============================================ */

/*
RADIUS SCALE:
--radius-xs: 0.25rem
--radius-sm: 0.5rem
--radius-md: 0.75rem
--radius-lg: 1rem
--radius-xl: 1.5rem
--radius-2xl: 2rem
--radius-full: 9999px (circles)

UTILITY CLASSES:
.rounded { border-radius: 1rem; }
.rounded-md { border-radius: 0.75rem; }
.rounded-lg { border-radius: 1rem; }
.rounded-xl { border-radius: 1.5rem; }
.rounded-2xl { border-radius: 2rem; }
.rounded-full { border-radius: 9999px; }
*/

/* ============================================
   DARK MODE SUPPORT
   ============================================ */

/*
ACTIVATION:
- Add data-theme="dark" to <html> element
- Automatically syncs with localStorage
- ThemeToggle component handles this

THE SYSTEM AUTOMATICALLY:
- Changes colors on dark mode
- Adjusts background colors
- Updates text colors
- Modifies border colors
- Maintains contrast for accessibility

NO ADDITIONAL CODE NEEDED IN COMPONENTS!
Just use the design system classes normally.
*/

/* ============================================
   LOADING STATES
   ============================================ */

/*
LOADING SKELETON:
<div className="skeleton skeleton-text w-3/4" />
<div className="skeleton skeleton-avatar" />
<div className="skeleton skeleton-card" />

LOADING SPINNER:
Use the LoadingSpinner component:
import { LoadingSpinner } from '@/components/Loading';
<LoadingSpinner size="md" />

PAGE LOADER:
import { PageLoader } from '@/components/Loading';
<PageLoader /> (shows full page overlay)
*/

/* ============================================
   TOAST NOTIFICATIONS
   ============================================ */

/*
USAGE IN COMPONENTS:
import { useToast } from '@/components/Toast';

function MyComponent() {
  const toast = useToast();
  
  const handleSuccess = () => {
    toast.success('Operation completed!');
  };
  
  const handleError = () => {
    toast.error('Something went wrong!');
  };
  
  const handleWarning = () => {
    toast.warning('Please be careful!');
  };
  
  return (
    <>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
    </>
  );
}

DURATION:
toast.success('Message', 4000); // Auto-dismiss after 4 seconds
*/

/* ============================================
   THEME TOGGLE
   ============================================ */

/*
AUTOMATIC THEME SWITCHING:
import ThemeToggle from '@/components/ThemeToggle';

// In any component:
<ThemeToggle />

FEATURES:
- Saves preference to localStorage
- Syncs across all components
- No page reload needed
- Icon changes based on current theme
*/

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */

/*
BREAKPOINTS:
- Mobile First (default): 0px and up
- Tablet: 768px and up
- Desktop: 1024px and up

RESPONSIVE UTILITIES:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  <!-- Automatically adjusts columns -->
</div>

Media queries are built into grids:
.grid-cols-2 → 1 col on mobile, 2 on tablet
.grid-cols-3 → 1 col on mobile, 2 on tablet, 3 on desktop
.grid-cols-4 → 1 col on mobile, 2 on tablet, 4 on desktop
*/

/* ============================================
   ACCESSIBILITY & BEST PRACTICES
   ============================================ */

/*
1. SEMANTIC HTML:
<button class="btn btn-primary"> not <div class="btn">
<input type="email" class="input"> not <input type="text">

2. ARIA LABELS:
<button aria-label="Close dialog">✕</button>
<input placeholder="Search..." aria-label="Search">

3. COLOR CONTRAST:
All color combinations meet WCAG AA standards.

4. FOCUS STATES:
All interactive elements have visible focus states.
Users can navigate with Tab key.

5. FORM LABELS:
Always use <label> with proper for/id attributes.

6. IMAGES & ICONS:
Always provide alt text or aria-label.
*/

/* ============================================
   QUICK START TEMPLATE
   ============================================ */

/*
Create a new page/component:

import { useState } from 'react';
import { useToast } from '@/components/Toast';
import { LoadingSpinner } from '@/components/Loading';

export default function NewPage() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Your API call
      toast.success('Success!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) return <LoadingSpinner />;
  
  return (
    <div className="container p-6">
      <h1>Page Title</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Section Title</h3>
          </div>
          <div className="card-body">
            Content here...
          </div>
          <div className="card-footer">
            <button className="btn btn-primary">Action</button>
          </div>
        </div>
      </div>
    </div>
  );
}
*/
