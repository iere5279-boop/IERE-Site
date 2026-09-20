'use client';

import React from 'react';
import { X } from 'lucide-react';

interface ToastProps {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  onDismiss: (id: string) => void;
}

export function Toast({ id, message, type = 'info', onDismiss }: ToastProps) {
  const types = {
    info: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600',
  };

  return (
    <div className={`${types[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3`}>
      <span className="flex-1">{message}</span>
      <button
        onClick={() => onDismiss(id)}
        className="p-1 hover:bg-white/20 rounded transition-colors"
        aria-label="Dismiss toast"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Array<{
    id: string;
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
  }>;
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

// Simple toast hook
let toastListeners: Array<(toast: Omit<ToastProps, 'onDismiss'>) => void> = [];

export function useToast() {
  const [toasts, setToasts] = React.useState<Array<{
    id: string;
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
  }>>([]);

  React.useEffect(() => {
    const listener = (toast: Omit<ToastProps, 'onDismiss'>) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 5000);
    };

    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener);
    };
  }, []);

  const showToast = React.useCallback(
    (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
      const id = Math.random().toString(36).substr(2, 9);
      const toast = { id, message, type };
      toastListeners.forEach((listener) => listener(toast));
    },
    []
  );

  const dismissToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, showToast, dismissToast };
}
