'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  variant?: 'default' | 'danger' | 'success' | 'warning';
}

export function Dialog({
  isOpen,
  onClose,
  title,
  children,
  actions,
  variant = 'default',
}: DialogProps) {
  if (!isOpen) return null;

  const variantClasses = {
    default: 'border-blue-500',
    danger: 'border-red-500',
    success: 'border-green-500',
    warning: 'border-yellow-500',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className={cn(
          'relative bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full p-6',
          'border-l-4',
          variantClasses[variant]
        )}
      >
        <h3 id="dialog-title" className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        
        <div className="text-gray-600 dark:text-gray-300 mb-6">
          {children}
        </div>
        
        {actions && (
          <div className="flex justify-end gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
