import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useTodoStore } from '../store/todoStore';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

export const TodoInput: React.FC = () => {
  const [title, setTitle] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo({
        title: title.trim(),
        completed: false,
        priority: 'medium',
        subtasks: [],
      });
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-3">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
        />
        <Button type="submit">
          <PlusIcon className="w-6 h-6" />
        </Button>
      </div>
    </form>
  );
};