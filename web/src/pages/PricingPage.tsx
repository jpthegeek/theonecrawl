import { useState } from 'react';
import { Link } from 'react-router-dom';
import { plans } from '@/config/plans';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: 'What counts as a credit?',
    a: 'Each scrape costs 1 credit, each crawled page costs 1 credit, each map request costs 1 credit, and AI extraction costs 5 credits per URL.',
  },
  {
    q: 'Can I self-host TheOneCrawl?',
    a: 'Yes! TheOneCrawl is open source under AGPL-3.0. You can self-host the engine for free. The managed API adds authentication, billing, and the dashboard.',
  },
  {
    q: 'Is it compatible with Firecrawl?',
    a: 'Yes. TheOneCrawl implements a Firecrawl-compatible API. You can switch by changing your base URL and API key. We also add exclusive features like CMS blocks and design system extraction.',
  },
  {
    q: 'What happens if I exceed my credits?',
    a: 'API requests will return a 402 error. You can upgrade your plan at any time. Credits reset on the 1st of each month.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel anytime from the billing page. You\'ll keep your plan until the end of the billing period.',
  },
];

export function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Simple, transparent pricing</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Start free. Scale as you grow.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {plans.map((plan) => (
            <Card key={plan.id} className={plan.highlighted ? 'ring-2 ring-brand-500' : ''}>
              <CardContent className="py-8 space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-xl">{plan.name}</h3>
                    {plan.highlighted && <Badge variant="success">Popular</Badge>}
                  </div>
                  <p className="text-4xl font-bold mt-3">
                    ${plan.price}<span className="text-lg font-normal text-gray-500">/mo</span>
                  </p>
                </div>
                <ul className="space-y-3 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">&#10003;</span>
                      <span className="text-gray-600 dark:text-gray-400">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="block">
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? 'primary' : 'secondary'}
                  >
                    {plan.price === 0 ? 'Get started' : 'Start free trial'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently asked questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-4 py-3 text-left font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  {openFaq === i ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-3 text-sm text-gray-600 dark:text-gray-400">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
