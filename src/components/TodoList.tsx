import React from 'react';
import { useTodoStore } from '../store/todoStore';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const todos = useTodoStore((state) => state.todos);

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      {todos.length === 0 && (
        <div className="text-center py-12 glass-card rounded-xl">
          <p className="text-xl text-white/80">No tasks yet</p>
          <p className="text-sm text-white/60 mt-2">Add a new task to get started</p>
        </div>
      )}
    </div>
  );
};