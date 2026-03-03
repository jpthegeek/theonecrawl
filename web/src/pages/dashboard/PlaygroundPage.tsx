import { useState, type FormEvent } from 'react';
import { apiFetch } from '@/config/api';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Tabs } from '@/components/ui/Tabs';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Alert } from '@/components/ui/Alert';

type Mode = 'scrape' | 'crawl' | 'map';

export function PlaygroundPage() {
  const [mode, setMode] = useState<Mode>('scrape');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      let data: unknown;
      if (mode === 'scrape') {
        data = await apiFetch('/v1/scrape', { method: 'POST', json: { url, formats: ['markdown'] } });
      } else if (mode === 'crawl') {
        data = await apiFetch('/v1/crawl', { method: 'POST', json: { url, limit: 5 } });
      } else {
        data = await apiFetch('/v1/map', { method: 'POST', json: { url } });
      }
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Playground</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Test the API interactively.</p>
      </div>

      <Card>
        <CardContent className="space-y-4">
          <Tabs
            tabs={[
              { id: 'scrape', label: 'Scrape' },
              { id: 'crawl', label: 'Crawl' },
              { id: 'map', label: 'Map' },
            ]}
            active={mode}
            onChange={(id) => setMode(id as Mode)}
          />

          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="https://example.com"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <Button type="submit" loading={loading}>
              {mode === 'scrape' ? 'Scrape' : mode === 'crawl' ? 'Crawl' : 'Map'}
            </Button>
          </form>

          {error && <Alert variant="error">{error}</Alert>}

          {result && <CodeBlock code={result} language="json" />}
        </CardContent>
      </Card>
    </div>
  );
}
