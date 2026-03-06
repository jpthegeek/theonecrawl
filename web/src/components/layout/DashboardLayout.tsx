import { Outlet, Link } from 'react-router-dom';
import { HubBar } from '@theonefamily/hub-bar';
import { AnimatedPage } from '@theonefamily/ui';
import { useAuth } from '@/hooks/useAuth';
import { Sidebar } from './Sidebar';
import { BirdSymbol } from '@/components/BirdSymbol';
import { Button } from '@/components/ui/Button';

export function DashboardLayout() {
  const { account, logout } = useAuth();

  return (
    <>
      <HubBar
        currentProduct="crawl"
        apiBase={import.meta.env.VITE_BUS_URL ?? 'https://api.theonebus.app'}
        hubUrl={import.meta.env.VITE_HUB_URL}
        supportConfig={{
          apiBaseUrl: import.meta.env.VITE_OPS_CENTER_API_URL ?? 'https://api.theoneops.app',
          apiKey: import.meta.env.VITE_OPS_CENTER_API_KEY ?? '',
          platformId: 'crawl',
          platformName: 'The One Crawl',
        }}
      />
    <div className="flex flex-col bg-background" style={{ marginTop: '48px', minHeight: 'calc(100vh - 48px)' }}>
      <header className="sticky top-[48px] z-40 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-6">
          <Link to="/dashboard" className="flex items-center gap-2">
            <BirdSymbol className="h-[18px] w-[18px] text-orange-500" />
            <span className="font-semibold text-sm text-foreground">The One Crawl</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{account?.email}</span>
            <Button variant="ghost" size="sm" onClick={() => void logout()}>
              Sign out
            </Button>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <AnimatedPage><Outlet /></AnimatedPage>
        </main>
      </div>
    </div>
    </>
  );
}
