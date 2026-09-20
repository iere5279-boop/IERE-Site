'use client';

import React, { useState, createContext, useContext, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AccordionContextType {
  openItems: string[];
  toggleItem: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

interface AccordionProps {
  children: ReactNode;
  type?: 'single' | 'multiple';
  className?: string;
}

export function Accordion({ children, type = 'single', className }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (value: string) => {
    setOpenItems(prev => {
      if (type === 'single') {
        return prev.includes(value) ? [] : [value];
      } else {
        return prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value];
      }
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn('space-y-2', className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function AccordionItem({ value, children, className }: AccordionItemProps) {
  return (
    <div className={cn('border border-gray-200 dark:border-gray-700 rounded-lg', className)}>
      {children}
    </div>
  );
}

interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
}

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const accordionContext = useContext(AccordionContext);
  const itemContext = useContext<any>(AccordionItemContext || AccordionContext);
  
  if (!accordionContext) throw new Error('AccordionTrigger must be used within Accordion');

  const parentValue = itemContext?.value;
  const isOpen = parentValue ? accordionContext.openItems.includes(parentValue) : false;

  return (
    <button
      onClick={() => parentValue && accordionContext.toggleItem(parentValue)}
      className={cn(
        'w-full flex items-center justify-between p-4 text-left font-medium',
        'hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors',
        className
      )}
    >
      {children}
      <svg
        className={cn('w-5 h-5 transition-transform', isOpen && 'rotate-180')}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

const AccordionItemContext = createContext<{ value: string } | undefined>(undefined);

interface AccordionContentProps {
  children: ReactNode;
  className?: string;
}

export function AccordionContent({ children, className }: AccordionContentProps) {
  const accordionContext = useContext(AccordionContext);
  const itemContext = useContext<any>(AccordionItemContext);
  
  if (!accordionContext) throw new Error('AccordionContent must be used within Accordion');

  const parentValue = itemContext?.value;
  const isOpen = parentValue ? accordionContext.openItems.includes(parentValue) : false;
  if (!isOpen) return null;

  return (
    <div className={cn('px-4 pb-4 pt-0', className)}>
      {children}
    </div>
  );
}
