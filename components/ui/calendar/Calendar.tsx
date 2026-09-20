'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface CalendarProps {
  selectedDate?: Date;
  onSelect: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
}

export function Calendar({ selectedDate, onSelect, minDate, maxDate, disabledDates = [] }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const isDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return disabledDates.some(d => d.toDateString() === date.toDateString());
  };

  const isSelected = (date: Date) => 
    selectedDate?.toDateString() === date.toDateString();

  const isToday = (date: Date) => 
    new Date().toDateString() === date.toDateString();

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="w-72 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-semibold text-gray-900 dark:text-white">
          {monthNames[month]} {year}
        </span>
        <button onClick={nextMonth} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = new Date(year, month, i + 1);
          const disabled = isDisabled(date);
          const selected = isSelected(date);
          const today = isToday(date);

          return (
            <button
              key={i + 1}
              onClick={() => !disabled && onSelect(date)}
              disabled={disabled}
              className={cn(
                'h-8 w-8 text-sm rounded-full flex items-center justify-center transition-colors',
                disabled && 'text-gray-300 dark:text-gray-600 cursor-not-allowed',
                !disabled && selected && 'bg-blue-500 text-white',
                !disabled && !selected && today && 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300',
                !disabled && !selected && !today && 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white'
              )}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
