import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'icon' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  const baseStyles = 'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30';
  
  const variants = {
    primary: 'bg-white/20 text-white hover:bg-white/30 rounded-xl',
    icon: 'text-white/50 hover:text-rose-300 rounded-lg hover:bg-rose-400/20',
    danger: 'text-rose-300 hover:bg-rose-400/20 rounded-lg',
  };

  const sizes = {
    sm: 'p-2',
    md: 'px-6 py-3',
    lg: 'px-8 py-4',
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};