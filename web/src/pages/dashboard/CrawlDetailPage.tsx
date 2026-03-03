import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApiQuery } from '@/hooks/useApi';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { Skeleton } from '@/components/ui/Skeleton';
import { CodeBlock } from '@/components/ui/CodeBlock';

interface CrawlDetail {
  success: boolean;
  status: string;
  total: number;
  completed: number;
  creditsUsed: number;
  data: Array<{
    markdown?: string;
    html?: string;
    metadata: {
      title: string;
      sourceURL: string;
      statusCode: number;
    };
  }>;
}

export function CrawlDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useApiQuery<CrawlDetail>(['crawl', id!], `/v1/crawl/${id}`);
  const [activeTab, setActiveTab] = useState('pages');

  if (isLoading) {
    return <div className="space-y-4"><Skeleton className="h-8 w-64" /><Skeleton className="h-64 w-full" /></div>;
  }

  if (!data) {
    return <p className="text-gray-500">Crawl not found.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Crawl {id?.slice(0, 8)}...</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {data.completed}/{data.total} pages &middot; {data.creditsUsed} credits
          </p>
        </div>
        <Badge
          variant={
            data.status === 'completed' ? 'success' :
            data.status === 'failed' ? 'error' : 'info'
          }
        >
          {data.status}
        </Badge>
      </div>

      <Tabs
        tabs={[
          { id: 'pages', label: 'Pages' },
          { id: 'cms-blocks', label: 'CMS Blocks' },
          { id: 'design-system', label: 'Design System' },
        ]}
        active={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'pages' && (
        <div className="space-y-4">
          {data.data.map((page, i) => (
            <Card key={i}>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{page.metadata.title || 'Untitled'}</h3>
                  <Badge variant={page.metadata.statusCode < 400 ? 'success' : 'error'}>
                    {page.metadata.statusCode}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mb-3">{page.metadata.sourceURL}</p>
                {page.markdown && (
                  <CodeBlock code={page.markdown.slice(0, 500)} language="markdown" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'cms-blocks' && (
        <Card>
          <CardContent className="text-gray-500 py-8 text-center">
            Use the API to fetch CMS blocks: <code className="text-sm">GET /v1/crawl/{id}/cms-blocks</code>
          </CardContent>
        </Card>
      )}

      {activeTab === 'design-system' && (
        <Card>
          <CardContent className="text-gray-500 py-8 text-center">
            Use the API to fetch the design system: <code className="text-sm">GET /v1/crawl/{id}/design-system</code>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
