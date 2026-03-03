import { clsx } from 'clsx';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        {
          'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300': variant === 'default',
          'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300': variant === 'success',
          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300': variant === 'warning',
          'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300': variant === 'error',
          'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300': variant === 'info',
        },
        className,
      )}
    >
      {children}
    </span>
  );
}
