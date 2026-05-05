import { useEffect } from 'react';

const toastStore = {
  listeners: [],
  toasts: [],
  
  subscribe: (listener) => {
    toastStore.listeners.push(listener);
    return () => {
      toastStore.listeners = toastStore.listeners.filter(l => l !== listener);
    };
  },
  
  emit: () => {
    toastStore.listeners.forEach(listener => listener(toastStore.toasts));
  },
  
  add: (message, type = 'info', duration = 4000) => {
    const id = Date.now();
    const toast = { id, message, type };
    toastStore.toasts.push(toast);
    toastStore.emit();
    
    if (duration > 0) {
      setTimeout(() => toastStore.remove(id), duration);
    }
    
    return id;
  },
  
  remove: (id) => {
    toastStore.toasts = toastStore.toasts.filter(t => t.id !== id);
    toastStore.emit();
  },
  
  clear: () => {
    toastStore.toasts = [];
    toastStore.emit();
  }
};

export function useToast() {
  return {
    success: (message, duration) => toastStore.add(message, 'success', duration),
    error: (message, duration) => toastStore.add(message, 'danger', duration),
    warning: (message, duration) => toastStore.add(message, 'warning', duration),
    info: (message, duration) => toastStore.add(message, 'info', duration),
    remove: (id) => toastStore.remove(id),
    clear: () => toastStore.clear()
  };
}

export function ToastContainer() {
  const [toasts, setToasts] = useToast._useState ? useToast._useState([]) : [[], () => {}];

  useEffect(() => {
    const unsubscribe = toastStore.subscribe(setToasts);
    setToasts(toastStore.toasts);
    return unsubscribe;
  }, []);

  return (
    <div className="fixed bottom-4 right-4 space-y-3 pointer-events-none z-50">
      {toastStore.toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => toastStore.remove(toast.id)}
        />
      ))}
    </div>
  );
}

function Toast({ id, message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [id]);

  const iconMap = {
    success: '✓',
    danger: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  return (
    <div
      className={`alert alert-${type} pointer-events-auto shadow-lg animate-slide-up`}
      style={{ pointerEvents: 'auto' }}
    >
      <span className="text-lg">{iconMap[type]}</span>
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-auto text-current opacity-70 hover:opacity-100"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
}
