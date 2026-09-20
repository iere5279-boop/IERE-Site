'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement>;
  align?: 'left' | 'right';
  children: React.ReactNode;
}

export function Dropdown({ isOpen, onClose, anchorRef, align = 'left', children }: DropdownProps) {
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (anchorRef.current && !anchorRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, anchorRef]);

  if (!isOpen) return null;

  return (
    <div
      className={`absolute z-50 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 ${
        align === 'right' ? 'right-0' : 'left-0'
      }`}
      role="menu"
    >
      {children}
    </div>
  );
}

interface DropdownItemProps {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
}

export function DropdownItem({ icon, label, onClick, disabled = false, danger = false }: DropdownItemProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
        disabled
          ? 'text-gray-300 cursor-not-allowed'
          : danger
          ? 'text-red-600 hover:bg-red-50'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
      role="menuitem"
    >
      {icon && <span className="w-5 h-5 flex items-center justify-center">{icon}</span>}
      {label}
    </button>
  );
}

interface DropdownDividerProps {}

export function DropdownDivider({}: DropdownDividerProps) {
  return <div className="my-1 border-t border-gray-200" role="separator" />;
}
