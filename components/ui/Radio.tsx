'use client';

import React from 'react';

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex items-start gap-3">
        <div className="relative flex items-center">
          <input
            type="radio"
            ref={ref}
            className={`peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0 transition-all disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...props}
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">
            <div className="w-full h-full bg-emerald-600 rounded-full" />
          </div>
        </div>
        {label && (
          <label className="text-sm text-gray-700 cursor-pointer select-none">
            {label}
          </label>
        )}
        {error && (
          <p className="text-sm text-red-600 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
