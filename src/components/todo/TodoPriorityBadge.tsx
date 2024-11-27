import React from 'react';
import clsx from 'clsx';
import { priorityColors } from '../../constants/colors';
import { Todo } from '../../types/todo';

interface TodoPriorityBadgeProps {
  priority: Todo['priority'];
}

export const TodoPriorityBadge: React.FC<TodoPriorityBadgeProps> = ({ priority }) => {
  return (
    <span
      className={clsx(
        'px-3 py-1 rounded-lg text-xs font-medium border',
        priorityColors[priority]
      )}
    >
      {priority}
    </span>
  );
};