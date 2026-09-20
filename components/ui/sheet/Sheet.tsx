'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  side?: 'left' | 'right' | 'top' | 'bottom';
  children: React.ReactNode;
  title?: string;
}

export function Sheet({ isOpen, onClose, side = 'right', children, title }: SheetProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setShouldRender(true);
    else setTimeout(() => setShouldRender(false), 300);
  }, [isOpen]);

  if (!shouldRender) return null;

  const sideClasses = {
    left: 'left-0 top-0 h-full w-80 max-w-[80vw]',
    right: 'right-0 top-0 h-full w-80 max-w-[80vw]',
    top: 'top-0 left-0 w-full h-80 max-h-[80vh]',
    bottom: 'bottom-0 left-0 w-full h-80 max-h-[80vh]',
  };

  const transformClasses = {
    left: '-translate-x-full',
    right: 'translate-x-full',
    top: '-translate-y-full',
    bottom: 'translate-y-full',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Panel */}
      <div
        className={cn(
          'fixed z-50 bg-white dark:bg-gray-900 shadow-xl transition-transform duration-300 ease-in-out',
          sideClasses[side],
          isOpen ? 'transform-none' : transformClasses[side]
        )}
        role="dialog"
        aria-modal="true"
      >
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="overflow-y-auto h-full">{children}</div>
      </div>
    </>
  );
}
