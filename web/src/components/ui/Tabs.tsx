import { clsx } from 'clsx';

interface TabsProps {
  tabs: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <nav className="flex gap-4 -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={clsx(
              'px-1 py-3 text-sm font-medium border-b-2 transition-colors',
              active === tab.id
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300',
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
