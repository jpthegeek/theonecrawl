import { useUsage } from '@/hooks/useUsage';
import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { CreditUsageChart } from '@/components/charts/CreditUsageChart';

export function UsagePage() {
  const { data, isLoading } = useUsage();

  if (isLoading) {
    return <div className="space-y-4"><Skeleton className="h-8 w-48" /><Skeleton className="h-64 w-full" /></div>;
  }

  const credits = data?.credits;
  const percentage = credits ? Math.round((credits.used / credits.total) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Usage</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Track your credit consumption.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="py-5">
            <p className="text-sm text-gray-500">Used</p>
            <p className="text-2xl font-bold mt-1">{credits?.used.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-5">
            <p className="text-sm text-gray-500">Remaining</p>
            <p className="text-2xl font-bold mt-1">{credits?.remaining.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-5">
            <p className="text-sm text-gray-500">Resets</p>
            <p className="text-2xl font-bold mt-1">
              {credits?.resetDate ? new Date(credits.resetDate).toLocaleDateString() : '—'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress bar */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Credit usage</span>
            <span className="text-sm text-gray-500">{percentage}%</span>
          </div>
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-600 rounded-full transition-all"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      {data?.dailyUsage && data.dailyUsage.length > 0 && (
        <Card>
          <CardContent>
            <h2 className="font-semibold mb-4">Daily Breakdown (30 days)</h2>
            <CreditUsageChart data={data.dailyUsage} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
