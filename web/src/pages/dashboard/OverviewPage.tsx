import { Link } from 'react-router-dom';
import { Globe, Key, BarChart3, Beaker } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUsage } from '@/hooks/useUsage';
import { useJobs } from '@/hooks/useJobs';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { CreditUsageChart } from '@/components/charts/CreditUsageChart';

export function OverviewPage() {
  const { account } = useAuth();
  const { data: usage, isLoading: usageLoading } = useUsage();
  const { data: jobsData, isLoading: jobsLoading } = useJobs(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {account?.name}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Here's an overview of your account.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="py-5">
            <p className="text-sm text-gray-500">Credits Used</p>
            {usageLoading ? (
              <Skeleton className="h-8 w-24 mt-1" />
            ) : (
              <p className="text-2xl font-bold mt-1">
                {usage?.credits.used.toLocaleString()} <span className="text-sm font-normal text-gray-400">/ {usage?.credits.total.toLocaleString()}</span>
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-5">
            <p className="text-sm text-gray-500">Credits Remaining</p>
            {usageLoading ? (
              <Skeleton className="h-8 w-24 mt-1" />
            ) : (
              <p className="text-2xl font-bold mt-1">{usage?.credits.remaining.toLocaleString()}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-5">
            <p className="text-sm text-gray-500">Plan</p>
            <p className="text-2xl font-bold mt-1 capitalize">{account?.plan}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-5">
            <p className="text-sm text-gray-500">Recent Crawls</p>
            {jobsLoading ? (
              <Skeleton className="h-8 w-12 mt-1" />
            ) : (
              <p className="text-2xl font-bold mt-1">{jobsData?.total ?? 0}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Usage chart */}
      {usage && usage.dailyUsage.length > 0 && (
        <Card>
          <CardContent>
            <h2 className="font-semibold mb-4">Credit Usage (30 days)</h2>
            <CreditUsageChart data={usage.dailyUsage} />
          </CardContent>
        </Card>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { to: '/dashboard/playground', icon: Beaker, label: 'Try Playground' },
          { to: '/dashboard/api-keys', icon: Key, label: 'Manage API Keys' },
          { to: '/dashboard/crawls', icon: Globe, label: 'View Crawls' },
          { to: '/dashboard/usage', icon: BarChart3, label: 'Usage Details' },
        ].map(({ to, icon: Icon, label }) => (
          <Link key={to} to={to}>
            <Card className="hover:border-brand-300 dark:hover:border-brand-700 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-3 py-5">
                <Icon className="h-5 w-5 text-brand-600" />
                <span className="font-medium">{label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent crawls */}
      {jobsData && jobsData.jobs.length > 0 && (
        <Card>
          <CardContent>
            <h2 className="font-semibold mb-4">Recent Crawls</h2>
            <div className="space-y-2">
              {jobsData.jobs.slice(0, 5).map((job) => (
                <Link
                  key={job.id}
                  to={`/dashboard/crawls/${job.id}`}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <span className="text-sm truncate max-w-[300px]">{job.url}</span>
                  </div>
                  <Badge
                    variant={
                      job.status === 'complete' ? 'success' :
                      job.status === 'failed' ? 'error' :
                      job.status === 'crawling' ? 'info' : 'default'
                    }
                  >
                    {job.status}
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
