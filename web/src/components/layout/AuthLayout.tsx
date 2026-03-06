import { Outlet } from 'react-router-dom';
import { AnimatedPage } from '@theonefamily/ui';

export function AuthLayout() {
  return <AnimatedPage><Outlet /></AnimatedPage>;
}
