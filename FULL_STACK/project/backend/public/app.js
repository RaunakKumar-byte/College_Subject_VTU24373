// ============================================
// MODERN EVENT TICKETING UI/UX INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Initializing Enhanced UI...');

  // ============================================
  // DARK MODE MANAGEMENT
  // ============================================
  const initDarkMode = () => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
    }
  };

  const darkToggles = document.querySelectorAll('.dark-toggle');
  darkToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDark);
      showToast(isDark ? '🌙 Dark mode enabled' : '☀️ Light mode enabled', 'info');
    });
  });

  initDarkMode();

  // ============================================
  // MOBILE MENU TOGGLE
  // ============================================
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
      mobileMenuToggle.setAttribute('aria-expanded', 
        navMenu.style.display === 'flex' ? 'true' : 'false'
      );
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.style.display = 'none';
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when clicking a nav link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.style.display = 'none';
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Hide menu on window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navMenu.style.display = 'flex';
      }
    });
  }

  // ============================================
  // SEARCH FUNCTIONALITY
  // ============================================
  const initSearch = () => {
    const searchInput = document.getElementById('searchEvent');
    const eventItems = document.querySelectorAll('.event-item');

    if (searchInput && eventItems.length > 0) {
      searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        let visibleCount = 0;

        eventItems.forEach(item => {
          const title = item.getAttribute('data-title') || '';
          const isVisible = title.includes(searchTerm);
          
          item.style.display = isVisible ? 'flex' : 'none';
          item.style.animation = isVisible ? 'fadeIn 0.3s ease-out' : 'none';
          
          if (isVisible) visibleCount++;
        });

        // Show "no results" if needed
        if (visibleCount === 0 && searchTerm !== '') {
          showToast('❌ No events found matching your search', 'warning');
        }
      });

      // Keyboard shortcut: Ctrl/Cmd + K to focus search
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          searchInput.focus();
          searchInput.select();
        }
      });
    }
  };

  initSearch();

  // ============================================
  // TOAST NOTIFICATIONS
  // ============================================
  window.showToast = (message, type = 'info', duration = 3000) => {
    const alertBox = document.getElementById('alertBox');
    if (!alertBox) return;

    alertBox.textContent = message;
    alertBox.className = `toast ${type}`;
    alertBox.classList.add('show');

    setTimeout(() => {
      alertBox.classList.remove('show');
    }, duration);
  };

  // ============================================
  // FORM VALIDATION & SUBMISSION
  // ============================================
  const initForms = () => {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        // Add loading state to submit button
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
          const originalHTML = submitBtn.innerHTML;
          submitBtn.innerHTML = '<span>⏳ Processing...</span>';
          submitBtn.disabled = true;

          // Show loading spinner
          const loadingBox = document.getElementById('loadingBox');
          if (loadingBox) loadingBox.style.display = 'block';

          // Re-enable after a delay
          setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
            if (loadingBox) loadingBox.style.display = 'none';
          }, 500);
        }
      });

      // Add visual feedback to form inputs
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('focus', function() {
          this.style.borderColor = 'var(--primary)';
          this.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
        });

        input.addEventListener('blur', function() {
          this.style.borderColor = 'var(--border-color)';
          this.style.boxShadow = 'none';
        });

        // Real-time validation for email
        if (input.type === 'email') {
          input.addEventListener('blur', function() {
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
            if (!isValid && this.value !== '') {
              this.style.borderColor = 'var(--danger)';
              showToast('❌ Please enter a valid email', 'error');
            }
          });
        }
      });
    });
  };

  initForms();

  // ============================================
  // EVENT CARD INTERACTIONS
  // ============================================
  const initEventCards = () => {
    const eventCards = document.querySelectorAll('.event-full-card');
    
    eventCards.forEach((card, index) => {
      card.style.animation = `slideInUp 0.5s ease-out ${index * 0.05}s backwards`;

      // Add hover effect
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px)';
      });

      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  };

  // Re-initialize on page load and when events are added dynamically
  initEventCards();

  // ============================================
  // BOOKING FORM ENHANCEMENT
  // ============================================
  const initBookingForms = () => {
    const bookingForms = document.querySelectorAll('.book-form');

    bookingForms.forEach(form => {
      const input = form.querySelector('input[name="seat_count"]');
      const button = form.querySelector('button');

      if (input) {
        input.addEventListener('change', function() {
          const count = parseInt(this.value);
          if (count > 5) {
            this.value = 5;
            showToast('⚠️ Maximum 5 seats per booking', 'warning');
          } else if (count < 1) {
            this.value = 1;
          }
        });
      }

      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (button) {
          button.disabled = true;
          button.innerHTML = '<span>⏳ Booking...</span>';
        }

        const loadingBox = document.getElementById('loadingBox');
        if (loadingBox) loadingBox.style.display = 'block';

        try {
          const eventId = form.getAttribute('data-event-id');
          const seatCount = input ? input.value : 1;

          const response = await fetch('/booking', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              event_id: eventId,
              seat_count: seatCount
            })
          });

          const data = await response.json();

          if (data.success) {
            showToast('✅ Booking confirmed! Check your dashboard.', 'success');
            setTimeout(() => window.location.reload(), 1500);
          } else {
            showToast(`❌ ${data.message || 'Booking failed'}`, 'error');
            if (button) {
              button.disabled = false;
              button.innerHTML = '<span>🎫 Book Now</span>';
            }
          }
        } catch (error) {
          console.error('Booking error:', error);
          showToast('❌ An error occurred. Please try again.', 'error');
          if (button) {
            button.disabled = false;
            button.innerHTML = '<span>🎫 Book Now</span>';
          }
        } finally {
          if (loadingBox) loadingBox.style.display = 'none';
        }
      });
    });
  };

  initBookingForms();

  // ============================================
  // COUNTDOWN TIMER
  // ============================================
  const updateCountdowns = () => {
    const countdowns = document.querySelectorAll('.countdown');

    const updateTimer = () => {
      countdowns.forEach(el => {
        const dateStr = el.getAttribute('data-date');
        if (!dateStr) return;

        const eventTime = new Date(dateStr).getTime();
        const now = new Date().getTime();
        const diff = eventTime - now;

        if (diff <= 0) {
          el.textContent = '🎉 Event is happening now!';
          el.style.color = 'var(--success)';
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) {
          el.textContent = `⏱️ Starts in ${days}d ${hours}h`;
        } else if (hours > 0) {
          el.textContent = `⏱️ Starts in ${hours}h ${minutes}m`;
        } else {
          el.textContent = `⏱️ Starts in ${minutes}m`;
          el.style.color = 'var(--danger)';
        }
      });
    };

    updateTimer();
    setInterval(updateTimer, 60000); // Update every minute
  };

  window.updateCountdowns = updateCountdowns;
  updateCountdowns();

  // ============================================
  // STATS CARD ANIMATIONS
  // ============================================
  const initStatsCards = () => {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach((card, index) => {
      card.style.animation = `slideInUp 0.5s ease-out ${index * 0.1}s backwards`;
    });
  };

  initStatsCards();

  // ============================================
  // REAL-TIME UPDATE HANDLER
  // ============================================
  window.updateSeats = (eventId, availableSeats) => {
    const seatElement = document.querySelector(`.seats[data-event-id="${eventId}"]`);
    if (seatElement) {
      const oldValue = seatElement.textContent;
      seatElement.textContent = availableSeats;
      
      if (parseInt(availableSeats) < parseInt(oldValue)) {
        seatElement.style.animation = 'pulse 0.5s ease-out';
        setTimeout(() => {
          seatElement.style.animation = '';
        }, 500);
      }
    }
  };

  // ============================================
  // ACCESSIBILITY IMPROVEMENTS
  // ============================================
  const initAccessibility = () => {
    // Add keyboard navigation for buttons
    const buttons = document.querySelectorAll('button, a[role="button"]');
    buttons.forEach(btn => {
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });

    // Announce messages to screen readers
    const announcements = document.querySelectorAll('[role="alert"]');
    announcements.forEach(el => {
      el.setAttribute('aria-live', 'polite');
      el.setAttribute('aria-atomic', 'true');
    });
  };

  initAccessibility();

  // ============================================
  // PAGE PERFORMANCE
  // ============================================
  // Lazy load images if needed
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  console.log('✅ Enhanced UI initialization complete!');
});
