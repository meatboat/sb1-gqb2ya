import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Todo } from '../types/todo';
import { useTodoStore } from '../store/todoStore';
import clsx from 'clsx';
import { TodoCheckbox } from './todo/TodoCheckbox';
import { TodoPriorityBadge } from './todo/TodoPriorityBadge';
import { TodoDueDate } from './todo/TodoDueDate';
import { TodoSubtaskList } from './todo/TodoSubtaskList';
import { Button } from './ui/Button';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo, toggleSubtask } = useTodoStore();

  return (
    <div className="glass-card rounded-xl p-6 mb-4 transform transition-all duration-200 hover:translate-y-[-2px]">
      <div className="flex items-center gap-4">
        <TodoCheckbox
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        
        <div className="flex-1">
          <h3
            className={clsx(
              'text-lg font-medium text-white',
              todo.completed && 'line-through opacity-50'
            )}
          >
            {todo.title}
          </h3>
          
          <div className="flex items-center gap-3 mt-2">
            <TodoPriorityBadge priority={todo.priority} />
            {todo.dueDate && <TodoDueDate date={todo.dueDate} />}
          </div>
        </div>

        <Button
          variant="icon"
          onClick={() => deleteTodo(todo.id)}
        >
          <TrashIcon className="w-5 h-5" />
        </Button>
      </div>

      <TodoSubtaskList
        subtasks={todo.subtasks}
        onToggle={(subtaskId) => toggleSubtask(todo.id, subtaskId)}
      />
    </div>
  );
};