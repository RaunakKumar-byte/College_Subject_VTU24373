export function LoadingSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="skeleton skeleton-text w-3/4" />
      <div className="skeleton skeleton-text w-1/2" />
      <div className="space-y-3 mt-4">
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text w-5/6" />
      </div>
    </div>
  );
}

export function LoadingSpinner({ size = 'md' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <svg
      className={`${sizeClasses[size]} animate-spin`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
        <LoadingSpinner size="lg" />
        <p className="text-center mt-4 text-text-muted">Loading...</p>
      </div>
    </div>
  );
}
