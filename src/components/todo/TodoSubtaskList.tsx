import React from 'react';
import { SubTask } from '../../types/todo';
import { TodoCheckbox } from './TodoCheckbox';
import clsx from 'clsx';

interface TodoSubtaskListProps {
  subtasks: SubTask[];
  onToggle: (subtaskId: string) => void;
}

export const TodoSubtaskList: React.FC<TodoSubtaskListProps> = ({
  subtasks,
  onToggle,
}) => {
  if (subtasks.length === 0) return null;

  return (
    <div className="mt-4 pl-11 space-y-2">
      {subtasks.map((subtask) => (
        <div key={subtask.id} className="flex items-center gap-3">
          <TodoCheckbox
            checked={subtask.completed}
            onChange={() => onToggle(subtask.id)}
            size="sm"
          />
          <span
            className={clsx(
              'text-sm text-white/80',
              subtask.completed && 'line-through opacity-50'
            )}
          >
            {subtask.title}
          </span>
        </div>
      ))}
    </div>
  );
};