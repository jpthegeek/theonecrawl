import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Key, Globe, BarChart3, CreditCard, Settings, Beaker } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/dashboard/api-keys', icon: Key, label: 'API Keys' },
  { to: '/dashboard/crawls', icon: Globe, label: 'Crawl History' },
  { to: '/dashboard/usage', icon: BarChart3, label: 'Usage' },
  { to: '/dashboard/billing', icon: CreditCard, label: 'Billing' },
  { to: '/dashboard/playground', icon: Beaker, label: 'Playground' },
  { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 border-r border-white/[0.06] bg-card/30 backdrop-blur-md min-h-[calc(100vh-4rem)]">
      <nav className="p-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={clsx(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-primary/10 border border-primary/20 text-primary'
                  : 'border border-transparent text-muted-foreground hover:bg-white/[0.04] hover:text-foreground',
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
