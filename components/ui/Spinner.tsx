'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'white';
}

export function Spinner({ size = 'md', variant = 'primary' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const variantClasses = {
    primary: 'text-emerald-600',
    secondary: 'text-gray-400',
    white: 'text-white',
  };

  return (
    <Loader2 className={`${sizeClasses[size]} ${variantClasses[variant]} animate-spin`} />
  );
}

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
}

export function LoadingOverlay({ isLoading, children, message }: LoadingOverlayProps) {
  if (!isLoading) return <>{children}</>;

  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" variant="primary" />
          {message && (
            <p className="text-sm text-gray-600 font-medium">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
