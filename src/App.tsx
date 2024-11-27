import React from 'react';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { FluidBackground } from './components/FluidBackground';

function App() {
  return (
    <>
      <FluidBackground />
      <div className="min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 via-pink-400/30 to-blue-400/30" />
        <div className="relative max-w-4xl mx-auto py-12 px-4">
          <div className="glass-effect rounded-2xl p-8">
            <header className="mb-8 text-center">
              <h1 className="text-5xl font-bold text-white mb-3">Tasks</h1>
              <p className="text-white/80 text-lg">
                Organize your tasks and stay productive
              </p>
            </header>
            
            <main>
              <TodoInput />
              <TodoList />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;