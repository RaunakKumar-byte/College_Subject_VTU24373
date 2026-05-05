// ============================================
// REAL-TIME UPDATES & SOCKET.IO HANDLERS
// ============================================

const socket = io();

// DOM Elements
const onlineUsersEl = document.getElementById("onlineUsers");
const liveActivity = document.getElementById("live-activity");
const alertBox = document.getElementById("alertBox");
const loadingBox = document.getElementById("loadingBox");
const eventsGrid = document.getElementById("eventsGrid");

// ============================================
// UTILITY FUNCTIONS
// ============================================

const escapeHtml = (value) => {
  const div = document.createElement("div");
  div.textContent = value == null ? "" : String(value);
  return div.innerHTML;
};

const formatDateTimeLocal = (value) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const formatLocaleString = (value) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString();
};

// Enhanced notification system
const showNotification = (message, type = 'info', duration = 3000) => {
  if (!alertBox) return;
  
  alertBox.textContent = message;
  alertBox.className = `toast ${type}`;
  alertBox.classList.add("show");
  
  // Auto-remove after duration
  setTimeout(() => {
    alertBox.classList.remove("show");
  }, duration);
};

// Alias for backward compatibility
const showAlert = (message, isError = false) => {
  showNotification(message, isError ? 'error' : 'success');
};

// ============================================
// REAL-TIME SEAT UPDATE
// ============================================

const updateSeatCount = (eventId, availableSeats) => {
  const seatElements = document.querySelectorAll(`.seats[data-event-id="${eventId}"]`);
  seatElements.forEach((el) => {
    const oldValue = parseInt(el.textContent);
    const newValue = parseInt(availableSeats);
    
    if (newValue !== oldValue) {
      el.textContent = String(availableSeats);
      
      // Add animation to highlight the change
      el.style.animation = 'pulse 0.6s ease-out';
      setTimeout(() => {
        el.style.animation = '';
      }, 600);

      // Show low stock warning
      if (newValue <= 5 && oldValue > 5) {
        showNotification('⚠️ Seats running out!', 'warning');
      }
    }
  });
};

// ============================================
// EVENT RENDERING
// ============================================

const adminEventFooter = (ev) => {
  const dt = formatDateTimeLocal(ev.event_date);
  return `
    <div class="event-card-footer">
      <a href="/events/delete/${ev.id}" class="btn-action btn-delete" onclick="return confirm('Delete this event?')">
        🗑️ Delete
      </a>
      <form action="/events/update/${ev.id}" method="POST" class="event-form" style="display: flex; gap: 0.5rem;">
        <input type="text" name="title" value="${escapeHtml(ev.title)}" required style="flex: 1;" />
        <button type="submit" class="btn-action btn-edit" style="flex: 0.8;">✏️ Update</button>
      </form>
    </div>`;
};

const userEventFooter = (ev) => `
    <div class="event-card-footer">
      <form class="book-form" data-event-id="${ev.id}">
        <input type="number" name="seat_count" min="1" max="5" value="1" required placeholder="Seats" />
        <button class="btn-submit" type="submit">🎫 Book Now</button>
      </form>
    </div>`;

const renderEventsGrid = (events) => {
  if (!eventsGrid || !Array.isArray(events)) return;
  
  const role = window.__USER_ROLE__ || "user";
  
  eventsGrid.innerHTML = events
    .map((ev) => {
      const titleLower = escapeHtml(String(ev.title || "").toLowerCase());
      const footer = role === "admin" ? adminEventFooter(ev) : userEventFooter(ev);
      
      return `
      <div class="event-full-card event-item" data-title="${titleLower}">
        <div class="event-card-header">
          <h3>${escapeHtml(ev.title)}</h3>
          <div class="badges">
            <span class="category-badge">${escapeHtml(ev.category)}</span>
          </div>
        </div>
        <div class="event-card-body">
          <p><strong>📝 Description:</strong> ${escapeHtml(ev.description) || "No description"}</p>
          <p><strong>📅 Date:</strong> ${escapeHtml(formatLocaleString(ev.event_date))}</p>
          <p><strong>👤 Organizer:</strong> ${escapeHtml(ev.creator_name)}</p>
          <p><strong>🎫 Seats:</strong> <span class="seats" data-event-id="${ev.id}">${escapeHtml(ev.available_seats)}</span> / ${escapeHtml(ev.total_seats)}</p>
          <p class="countdown" data-date="${escapeHtml(ev.event_date)}">⏱️ Starts in --</p>
        </div>
        ${footer}
      </div>`;
    })
    .join("");
  
  // Reinitialize all interactions for new elements
  if (window.updateCountdowns) updateCountdowns();
  initBookingForms();
};

// ============================================
// API & REFRESH
// ============================================

const refreshEventsFromApi = async () => {
  if (window.location.pathname !== "/events" || !eventsGrid) return;
  
  if (loadingBox) loadingBox.style.display = "block";
  
  try {
    const response = await fetch("/api/events", { credentials: "same-origin" });
    const data = await response.json();
    
    if (data.success && Array.isArray(data.events)) {
      renderEventsGrid(data.events);
      showNotification('✅ Events refreshed', 'success', 1500);
    } else {
      window.location.reload();
    }
  } catch (error) {
    console.error("Error refreshing events:", error);
    showNotification('❌ Failed to refresh events', 'error');
  } finally {
    if (loadingBox) loadingBox.style.display = "none";
  }
};

// ============================================
// COUNTDOWN TIMER
// ============================================

const updateCountdowns = () => {
  document.querySelectorAll(".countdown").forEach((el) => {
    const target = new Date(el.dataset.date).getTime();
    const now = Date.now();
    const diff = target - now;
    
    if (diff <= 0) {
      el.textContent = "🎉 Event is happening now!";
      el.style.color = 'var(--success)';
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      el.textContent = `⏱️ Starts in ${days}d ${hrs}h`;
      el.style.color = 'var(--warning)';
    } else if (hrs > 0) {
      el.textContent = `⏱️ Starts in ${hrs}h ${mins}m`;
      el.style.color = 'var(--warning)';
    } else {
      el.textContent = `⏱️ Starts in ${mins}m`;
      el.style.color = 'var(--danger)';
    }
  });
};

// ============================================
// BOOKING FORM HANDLER
// ============================================

const initBookingForms = () => {
  document.querySelectorAll(".book-form").forEach((form) => {
    // Remove old listeners by cloning
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    newForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      
      const eventId = newForm.dataset.eventId;
      const seatInput = newForm.querySelector('input[name="seat_count"]');
      const seatCount = seatInput ? parseInt(seatInput.value) : 1;
      const submitBtn = newForm.querySelector('button[type="submit"]');
      
      // Validation
      if (seatCount < 1 || seatCount > 5) {
        showNotification('⚠️ Please select 1-5 seats', 'warning');
        return;
      }
      
      // Show loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>⏳ Booking...</span>';
      }
      
      if (loadingBox) loadingBox.style.display = "block";
      
      try {
        const response = await fetch(`/events/${eventId}/book`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ seat_count: seatCount }),
          credentials: "same-origin",
        });
        
        const payload = await response.json();
        
        if (payload.success) {
          showNotification('✅ Booking confirmed! Redirecting...', 'success');
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 1500);
        } else {
          showNotification(`❌ ${payload.message || 'Booking failed'}`, 'error');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>🎫 Book Now</span>';
          }
        }
      } catch (error) {
        console.error("Booking error:", error);
        showNotification('❌ An error occurred. Please try again.', 'error');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>🎫 Book Now</span>';
        }
      } finally {
        if (loadingBox) loadingBox.style.display = "none";
      }
    });
  });
};

// ============================================
// SOCKET.IO EVENT HANDLERS
// ============================================

socket.on("connect", () => {
  console.log("✅ Connected to real-time updates");
});

socket.on("disconnect", () => {
  console.log("⚠️ Disconnected from real-time updates");
  showNotification('⚠️ Connection lost. Reconnecting...', 'warning', 5000);
});

socket.on("online-users", ({ count }) => {
  if (onlineUsersEl) {
    const oldCount = parseInt(onlineUsersEl.textContent) || 0;
    onlineUsersEl.textContent = String(count);
    
    // Highlight if count changed
    if (count !== oldCount) {
      onlineUsersEl.style.animation = 'pulse 0.6s ease-out';
      setTimeout(() => {
        onlineUsersEl.style.animation = '';
      }, 600);
    }
  }
});

socket.on("user-activity", ({ message, type = 'info' }) => {
  if (liveActivity) {
    liveActivity.textContent = message;
    liveActivity.style.animation = 'slideInUp 0.3s ease-out';
  }
  
  if (type === 'booking') {
    showNotification(message, 'info', 2000);
  }
});

socket.on("seat-updated", ({ eventId, availableSeats, message }) => {
  updateSeatCount(eventId, availableSeats);
  
  if (message) {
    showNotification(message, 'info', 2000);
  }
});

socket.on("event-created", ({ message }) => {
  showNotification(message || '✅ New event created!', 'success');
  setTimeout(() => {
    refreshEventsFromApi();
  }, 1000);
});

socket.on("event-updated", ({ message }) => {
  showNotification(message || '✅ Event updated!', 'info');
  setTimeout(() => {
    refreshEventsFromApi();
  }, 1000);
});

socket.on("event-deleted", ({ message }) => {
  showNotification(message || '✅ Event deleted!', 'info');
  setTimeout(() => {
    refreshEventsFromApi();
  }, 1000);
});

socket.on("events-refresh", () => {
  refreshEventsFromApi();
});

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

const initSearch = () => {
  const searchInput = document.getElementById("searchEvent");
  if (!searchInput) return;
  
  searchInput.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase().trim();
    const eventItems = document.querySelectorAll(".event-item");
    let visibleCount = 0;
    
    eventItems.forEach((item) => {
      const title = item.dataset.title || "";
      const isVisible = title.includes(query);
      
      item.style.display = isVisible ? "flex" : "none";
      item.style.animation = isVisible ? "fadeIn 0.3s ease-out" : "none";
      
      if (isVisible) visibleCount++;
    });
    
    if (visibleCount === 0 && query !== "") {
      showNotification('❌ No events found', 'warning', 2000);
    }
  });
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  initSearch();
  initBookingForms();
  
  // Update countdowns every minute
  setInterval(updateCountdowns, 60000);
  updateCountdowns();
  
  console.log("✅ Real-time system initialized");
});

// Make functions globally available for dynamic elements
window.updateCountdowns = updateCountdowns;
window.updateSeatCount = updateSeatCount;
window.showNotification = showNotification;
window.refreshEventsFromApi = refreshEventsFromApi;
