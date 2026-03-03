import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '@/hooks/useJobs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/ui/Table';
import { Skeleton } from '@/components/ui/Skeleton';

export function CrawlHistoryPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useJobs(page);

  const statusVariant = (status: string) => {
    switch (status) {
      case 'complete': return 'success' as const;
      case 'failed': return 'error' as const;
      case 'crawling': case 'extracting': case 'converting': return 'info' as const;
      case 'queued': return 'warning' as const;
      default: return 'default' as const;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Crawl History</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">View all your crawl jobs.</p>
      </div>

      <Card>
        {isLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : !data?.jobs.length ? (
          <div className="text-center py-12 text-gray-500">
            No crawls yet. Use the API or Playground to start crawling.
          </div>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>URL</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Pages</TableHeader>
                  <TableHeader>Started</TableHeader>
                  <TableHeader>Completed</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <Link to={`/dashboard/crawls/${job.id}`} className="text-brand-600 hover:underline truncate block max-w-[300px]">
                        {job.url}
                      </Link>
                    </TableCell>
                    <TableCell><Badge variant={statusVariant(job.status)}>{job.status}</Badge></TableCell>
                    <TableCell>{job.pages}</TableCell>
                    <TableCell className="text-gray-500">{new Date(job.createdAt).toLocaleString()}</TableCell>
                    <TableCell className="text-gray-500">{job.completedAt ? new Date(job.completedAt).toLocaleString() : '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {data.total > data.limit && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-800">
                <span className="text-sm text-gray-500">
                  Page {data.page} of {Math.ceil(data.total / data.limit)}
                </span>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
                    Previous
                  </Button>
                  <Button variant="secondary" size="sm" disabled={page >= Math.ceil(data.total / data.limit)} onClick={() => setPage(page + 1)}>
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}
