import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={clsx(
        'flex-1 px-6 py-3 rounded-xl glass-effect',
        'text-white placeholder-white/50',
        'focus:outline-none focus:ring-2 focus:ring-white/30',
        className
      )}
      {...props}
    />
  );
};