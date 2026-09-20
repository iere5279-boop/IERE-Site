'use client';

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onSearch?: (value: string) => void;
  debounceMs?: number;
}

export function SearchInput({ onSearch, debounceMs = 300, className = '', ...props }: SearchInputProps) {
  const [value, setValue] = useState(props.defaultValue?.toString() || props.value?.toString() || '');

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (onSearch && value !== props.value) {
        onSearch(value);
      }
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [value, onSearch, debounceMs, props.value]);

  const handleClear = () => {
    setValue('');
    if (props.onChange) {
      const event = { target: { value: '' } } as React.ChangeEvent<HTMLInputElement>;
      props.onChange(event);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (props.onChange) {
            props.onChange(e);
          }
        }}
        className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
        placeholder="Search..."
        {...props}
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
