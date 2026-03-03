import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { MarketingLayout } from '@/components/layout/MarketingLayout';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LandingPage } from '@/pages/LandingPage';
import { PricingPage } from '@/pages/PricingPage';
import { DocsPage } from '@/pages/DocsPage';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { OverviewPage } from '@/pages/dashboard/OverviewPage';
import { ApiKeysPage } from '@/pages/dashboard/ApiKeysPage';
import { CrawlHistoryPage } from '@/pages/dashboard/CrawlHistoryPage';
import { CrawlDetailPage } from '@/pages/dashboard/CrawlDetailPage';
import { UsagePage } from '@/pages/dashboard/UsagePage';
import { BillingPage } from '@/pages/dashboard/BillingPage';
import { SettingsPage } from '@/pages/dashboard/SettingsPage';
import { PlaygroundPage } from '@/pages/dashboard/PlaygroundPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Marketing */}
            <Route element={<MarketingLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            </Route>

            {/* Dashboard */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<OverviewPage />} />
                <Route path="/dashboard/api-keys" element={<ApiKeysPage />} />
                <Route path="/dashboard/crawls" element={<CrawlHistoryPage />} />
                <Route path="/dashboard/crawls/:id" element={<CrawlDetailPage />} />
                <Route path="/dashboard/usage" element={<UsagePage />} />
                <Route path="/dashboard/billing" element={<BillingPage />} />
                <Route path="/dashboard/settings" element={<SettingsPage />} />
                <Route path="/dashboard/playground" element={<PlaygroundPage />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
