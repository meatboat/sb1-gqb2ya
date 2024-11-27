import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface TodoCheckboxProps {
  checked: boolean;
  onChange: () => void;
  size?: 'sm' | 'md';
}

export const TodoCheckbox: React.FC<TodoCheckboxProps> = ({
  checked,
  onChange,
  size = 'md',
}) => {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
  };

  return (
    <button
      onClick={onChange}
      className={clsx(
        sizes[size],
        'rounded-lg border-2 flex items-center justify-center transition-all duration-200',
        checked
          ? 'border-white/50 bg-white/20 text-white'
          : 'border-white/30 hover:border-white/50'
      )}
    >
      {checked && <CheckCircleIcon className={size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} />}
    </button>
  );
};