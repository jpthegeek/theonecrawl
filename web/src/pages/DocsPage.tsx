import { useState } from 'react';
import { Tabs } from '@/components/ui/Tabs';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Card, CardContent } from '@/components/ui/Card';

const curlExamples = {
  scrape: `curl -X POST https://api.theonecrawl.app/v1/scrape \\
  -H "Authorization: Bearer tc_live_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com", "formats": ["markdown"]}'`,
  crawl: `# Start a crawl
curl -X POST https://api.theonecrawl.app/v1/crawl \\
  -H "Authorization: Bearer tc_live_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com", "limit": 10}'

# Check status
curl https://api.theonecrawl.app/v1/crawl/JOB_ID \\
  -H "Authorization: Bearer tc_live_YOUR_KEY"`,
  map: `curl -X POST https://api.theonecrawl.app/v1/map \\
  -H "Authorization: Bearer tc_live_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com"}'`,
  extract: `curl -X POST https://api.theonecrawl.app/v1/extract \\
  -H "Authorization: Bearer tc_live_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"urls": ["https://example.com"], "prompt": "Extract the company name and description"}'`,
};

const jsExamples = {
  scrape: `import { TheOneCrawl } from '@theonecrawl/js';

const client = new TheOneCrawl({ apiKey: 'tc_live_YOUR_KEY' });
const result = await client.scrapeUrl('https://example.com', {
  formats: ['markdown', 'links'],
});
console.log(result.data.markdown);`,
  crawl: `const crawl = await client.crawlUrl('https://example.com', {
  limit: 10,
  maxDepth: 2,
});
for (const page of crawl.data) {
  console.log(page.metadata.title, page.markdown?.length);
}`,
  map: `const map = await client.mapUrl('https://example.com', {
  limit: 100,
});
console.log(\`Found \${map.links.length} URLs\`);`,
  extract: `const result = await client.extract({
  urls: ['https://example.com'],
  prompt: 'Extract the company name and pricing plans',
});
console.log(result.data);`,
};

const pythonExamples = {
  scrape: `from theonecrawl import TheOneCrawl

client = TheOneCrawl(api_key="tc_live_YOUR_KEY")
result = client.scrape_url("https://example.com", {
    "formats": ["markdown", "links"],
})
print(result["data"]["markdown"])`,
  crawl: `crawl = client.crawl_url("https://example.com", {
    "limit": 10,
    "max_depth": 2,
})
for page in crawl["data"]:
    print(page["metadata"]["title"])`,
  map: `result = client.map_url("https://example.com", {
    "limit": 100,
})
print(f"Found {len(result['links'])} URLs")`,
  extract: `result = client.extract({
    "urls": ["https://example.com"],
    "prompt": "Extract the company name and pricing plans",
})
print(result["data"])`,
};

type Endpoint = 'scrape' | 'crawl' | 'map' | 'extract';

const endpoints = [
  { id: 'scrape', label: 'Scrape', method: 'POST', path: '/v1/scrape', desc: 'Scrape a single page and return its content in markdown, HTML, or structured formats.' },
  { id: 'crawl', label: 'Crawl', method: 'POST', path: '/v1/crawl', desc: 'Crawl multiple pages starting from a URL. Returns a job ID for polling.' },
  { id: 'map', label: 'Map', method: 'POST', path: '/v1/map', desc: 'Discover all URLs on a website via sitemaps and link crawling.' },
  { id: 'extract', label: 'Extract', method: 'POST', path: '/v1/extract', desc: 'AI-powered structured data extraction from web pages.' },
];

export function DocsPage() {
  const [activeEndpoint, setActiveEndpoint] = useState<Endpoint>('scrape');
  const [lang, setLang] = useState('curl');

  const endpoint = endpoints.find((e) => e.id === activeEndpoint)!;
  const examples = lang === 'curl' ? curlExamples : lang === 'javascript' ? jsExamples : pythonExamples;

  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">API Documentation</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Firecrawl-compatible API with exclusive CMS and design system features.
          </p>
        </div>

        {/* Auth section */}
        <Card className="mb-8">
          <CardContent className="space-y-3">
            <h2 className="text-xl font-bold">Authentication</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Include your API key in the <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">Authorization</code> header:
            </p>
            <CodeBlock code='Authorization: Bearer tc_live_YOUR_KEY' language="http" />
          </CardContent>
        </Card>

        {/* Endpoints */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            {endpoints.map((ep) => (
              <button
                key={ep.id}
                onClick={() => setActiveEndpoint(ep.id as Endpoint)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeEndpoint === ep.id
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                }`}
              >
                <span className="font-mono text-xs mr-2">{ep.method}</span>
                {ep.label}
              </button>
            ))}
          </div>

          <div className="md:col-span-3 space-y-4">
            <div>
              <h2 className="text-2xl font-bold">{endpoint.label}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{endpoint.desc}</p>
              <code className="mt-2 inline-block text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">
                {endpoint.method} {endpoint.path}
              </code>
            </div>

            <Tabs
              tabs={[
                { id: 'curl', label: 'cURL' },
                { id: 'javascript', label: 'JavaScript' },
                { id: 'python', label: 'Python' },
              ]}
              active={lang}
              onChange={setLang}
            />

            <CodeBlock
              code={examples[activeEndpoint]}
              language={lang === 'curl' ? 'bash' : lang}
            />
          </div>
        </div>

        {/* Exclusive features */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">TheOneCrawl Exclusive Endpoints</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="space-y-2">
                <code className="text-sm text-brand-600">GET /v1/crawl/:id/cms-blocks</code>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get CMS-ready content blocks from a completed crawl. Includes header, footer, and theme suggestion.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-2">
                <code className="text-sm text-brand-600">GET /v1/crawl/:id/design-system</code>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Extract the full design system: colors, fonts, spacing, button styles, and more.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
