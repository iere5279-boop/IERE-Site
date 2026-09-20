import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  alt: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ src, alt, fallback, size = 'md', className }: AvatarProps) {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-700 rounded-full',
        sizes[size],
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
          }}
        />
      ) : null}
      <span
        className={cn(
          'flex h-full w-full items-center justify-center rounded-full bg-blue-500 text-white font-medium',
          src && 'hidden'
        )}
      >
        {fallback}
      </span>
    </div>
  );
}

interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  className?: string;
}

export function AvatarGroup({ children, max = 4, className }: AvatarGroupProps) {
  const childArray = React.Children.toArray(children);
  const displayed = childArray.slice(0, max);
  const remaining = childArray.length - max;

  return (
    <div className={cn('flex -space-x-2', className)}>
      {displayed}
      {remaining > 0 && (
        <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300 ring-2 ring-white dark:ring-gray-900">
          +{remaining}
        </div>
      )}
    </div>
  );
}
