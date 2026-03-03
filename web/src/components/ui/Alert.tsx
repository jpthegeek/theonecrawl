import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  children: ReactNode;
  className?: string;
}

export function Alert({ variant = 'info', children, className }: AlertProps) {
  return (
    <div
      className={clsx(
        'rounded-lg px-4 py-3 text-sm',
        {
          'bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200': variant === 'info',
          'bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200': variant === 'success',
          'bg-yellow-50 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200': variant === 'warning',
          'bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200': variant === 'error',
        },
        className,
      )}
    >
      {children}
    </div>
  );
}
