import { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error';
  message: string;
}

let toasts: Toast[] = [];
let listeners: Array<(toasts: Toast[]) => void> = [];

export const toast = {
  success: (message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    toasts = [...toasts, { id, type: 'success', message }];
    listeners.forEach(listener => listener(toasts));
    setTimeout(() => {
      toasts = toasts.filter(t => t.id !== id);
      listeners.forEach(listener => listener(toasts));
    }, 5000);
  },
  error: (message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    toasts = [...toasts, { id, type: 'error', message }];
    listeners.forEach(listener => listener(toasts));
    setTimeout(() => {
      toasts = toasts.filter(t => t.id !== id);
      listeners.forEach(listener => listener(toasts));
    }, 5000);
  },
};

export function Toaster() {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const listener = (newToasts: Toast[]) => {
      setCurrentToasts(newToasts);
    };
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  const removeToast = (id: string) => {
    toasts = toasts.filter(t => t.id !== id);
    listeners.forEach(listener => listener(toasts));
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 w-full max-w-2xl px-4">
      {currentToasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center justify-center gap-3 px-6 py-4 rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.15)] ${
            toast.type === 'success'
              ? 'bg-[#1a5a3a] border border-[#2d7a52] text-white'
              : 'bg-[#7f1d1d] border border-[#991b1b] text-white'
          } animate-in slide-in-from-bottom duration-300`}
          style={{
            backdropFilter: 'blur(8px)',
          }}
        >
          {toast.type === 'success' ? (
            <CheckCircle className="h-5 w-5 text-[#4ade80] shrink-0" strokeWidth={2.5} />
          ) : (
            <XCircle className="h-5 w-5 text-[#f87171] shrink-0" strokeWidth={2.5} />
          )}
          <p className="flex-1 text-[15px] text-center">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-white/70 hover:text-white transition-colors shrink-0"
            aria-label="Close notification"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      ))}
    </div>
  );
}
