import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from '@heroicons/react/24/outline';

interface TodoDueDateProps {
  date: Date;
}

export const TodoDueDate: React.FC<TodoDueDateProps> = ({ date }) => {
  return (
    <span className="flex items-center gap-2 text-sm text-white/70">
      <CalendarIcon className="w-4 h-4" />
      {format(date, 'MMM d, yyyy')}
    </span>
  );
};