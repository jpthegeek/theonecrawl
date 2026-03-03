import { clsx } from 'clsx';
import type { HTMLAttributes } from 'react';

export function Table({ className, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto">
      <table className={clsx('w-full text-sm', className)} {...props} />
    </div>
  );
}

export function TableHead({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={clsx('border-b border-gray-200 dark:border-gray-800', className)} {...props} />;
}

export function TableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}

export function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={clsx('border-b border-gray-100 dark:border-gray-800 last:border-0', className)} {...props} />;
}

export function TableHeader({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return <th className={clsx('px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400', className)} {...props} />;
}

export function TableCell({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return <td className={clsx('px-4 py-3', className)} {...props} />;
}
