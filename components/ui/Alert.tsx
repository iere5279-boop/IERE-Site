'use client';

import React from 'react';
import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
}

export function Alert({ variant = 'info', title, children, onDismiss }: AlertProps) {
  const variants = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: Info,
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: CheckCircle,
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: AlertCircle,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: XCircle,
    },
  };

  const style = variants[variant];
  const Icon = style.icon;

  return (
    <div className={`${style.bg} border ${style.border} rounded-lg p-4`}>
      <div className="flex gap-3">
        <Icon className={`w-5 h-5 ${style.text} flex-shrink-0`} />
        <div className="flex-1">
          {title && (
            <h4 className={`font-semibold ${style.text} mb-1`}>{title}</h4>
          )}
          <div className={`${style.text} text-sm`}>{children}</div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className={`p-1 ${style.text} hover:opacity-75 transition-opacity`}
            aria-label="Dismiss alert"
          >
            <XCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
