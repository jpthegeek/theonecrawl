import { Link } from 'react-router-dom';
import { Globe, Code, Blocks, Palette, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CodeBlock } from '@/components/ui/CodeBlock';

const features = [
  { icon: Globe, title: 'Firecrawl Compatible', description: 'Drop-in replacement. Switch by changing your base URL and API key.' },
  { icon: Blocks, title: 'CMS Block Conversion', description: 'Convert any website into structured, drag-and-drop CMS blocks.' },
  { icon: Palette, title: 'Design System Extraction', description: 'Extract colors, fonts, spacing, and button styles automatically.' },
  { icon: Code, title: '4 SDKs', description: 'JavaScript, Python, CLI, and MCP server. Use from anywhere.' },
  { icon: Zap, title: 'AI Extraction', description: 'Claude-powered structured data extraction from any page.' },
  { icon: Shield, title: 'Open Source', description: 'AGPL-3.0 licensed engine. Self-host or use our managed API.' },
];

const jsExample = `import { TheOneCrawl } from '@theonecrawl/js';

const client = new TheOneCrawl({ apiKey: 'tc_live_...' });

// Scrape a page
const result = await client.scrapeUrl('https://example.com');
console.log(result.data.markdown);

// Crawl a website
const crawl = await client.crawlUrl('https://example.com', {
  limit: 10,
});
console.log(\`Crawled \${crawl.completed} pages\`);`;

export function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-primary/[0.07] blur-[120px] animate-float pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-primary/[0.05] blur-[100px] animate-float-slow pointer-events-none" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Web Crawling API with{' '}
            <span className="text-primary">CMS Intelligence</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Firecrawl-compatible API that goes further — convert any website into
            structured CMS blocks, extract design systems, and power AI workflows.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg">Get started free</Button>
            </Link>
            <Link to="/docs">
              <Button variant="secondary" size="lg">View docs</Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">500 free credits/mo. No credit card required.</p>
        </div>
      </section>

      {/* Code example */}
      <section className="py-16 bg-card/30">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-foreground">Simple to use</h2>
          <CodeBlock code={jsExample} language="javascript" />
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Everything you need to crawl the web
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="glass p-6 rounded-xl hover:border-white/[0.1] transition-colors">
                <Icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-foreground">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/[0.06] pointer-events-none" />
        <div className="absolute inset-0 border-t border-b border-primary/20 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground">Ready to start crawling?</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Get 500 free credits every month. Upgrade anytime.
          </p>
          <Link to="/register" className="mt-8 inline-block">
            <Button size="lg">Create free account</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
