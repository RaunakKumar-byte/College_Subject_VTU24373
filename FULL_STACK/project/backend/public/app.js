// Client-side interactivity: sidebar toggle, user dropdown, dark mode, etc.
document.addEventListener('DOMContentLoaded', () => {
  // Initialize dark mode from localStorage
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  if (savedDarkMode) {
    document.body.classList.add('dark-mode');
  }

  // Sidebar toggle (desktop collapse and mobile show)
  const sidebarToggles = document.querySelectorAll('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  
  sidebarToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.innerWidth < 769) {
        // Mobile behavior: slide in/out
        sidebar.classList.toggle('show');
      } else {
        // Desktop behavior: collapse/expand
        sidebar.classList.toggle('collapsed');
      }
    });
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth < 769) {
      if (!sidebar.contains(e.target) && !e.target.classList.contains('sidebar-toggle')) {
        sidebar.classList.remove('show');
      }
    }
  });

  // User dropdown menu
  const userBtn = document.querySelector('.user-btn');
  const dropdown = document.querySelector('.user-dropdown');
  
  if (userBtn && dropdown) {
    userBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!userBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });

    // Close dropdown when clicking on a link
    dropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        dropdown.classList.remove('show');
      });
    });
  }

  // Dark mode toggle
  const darkToggles = document.querySelectorAll('.dark-toggle');
  
  darkToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDark);
    });
  });

  // Responsive sidebar behavior on window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth >= 769) {
        sidebar.classList.remove('show');
      }
    }, 250);
  });

  // Smooth scroll behavior for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Form submission feedback
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creating...';
        submitBtn.disabled = true;
        
        // Re-enable after a short delay (form will submit)
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 1000);
      }
    });
  });

  // Add hover effect animations
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Event card animations
  const eventCards = document.querySelectorAll('.event-card');
  eventCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.05}s`;
  });

  // Input focus effects
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement?.style.setProperty('--focus-color', 'var(--primary)');
    });
  });

  // Notification badge animation (if exists)
  const badges = document.querySelectorAll('[data-notification]');
  badges.forEach(badge => {
    badge.style.animation = 'pulse 2s infinite';
  });

  // Add keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search (if search exists)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.querySelector('[data-search]');
      if (searchInput) searchInput.focus();
    }
  });

  // Initialize tooltips (if any data-tooltip exists)
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  tooltipElements.forEach(el => {
    el.title = el.getAttribute('data-tooltip');
  });

  console.log('Dashboard initialized successfully ✓');
});
