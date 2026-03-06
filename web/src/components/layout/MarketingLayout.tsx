import { Outlet } from 'react-router-dom';
import { AnimatedPage } from '@theonefamily/ui';
import { Header } from './Header';
import { Footer } from './Footer';

export function MarketingLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <AnimatedPage><Outlet /></AnimatedPage>
      </main>
      <Footer />
    </div>
  );
}
