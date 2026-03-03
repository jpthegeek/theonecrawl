export interface Plan {
  id: string;
  name: string;
  price: number;
  credits: number;
  rateLimit: number;
  concurrent: number;
  features: string[];
  highlighted?: boolean;
}

export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    credits: 500,
    rateLimit: 10,
    concurrent: 1,
    features: ['500 credits/mo', '10 req/min', '1 concurrent crawl', 'Community support'],
  },
  {
    id: 'hobby',
    name: 'Hobby',
    price: 12,
    credits: 3_000,
    rateLimit: 20,
    concurrent: 3,
    features: ['3,000 credits/mo', '20 req/min', '3 concurrent crawls', 'Email support'],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 59,
    credits: 50_000,
    rateLimit: 100,
    concurrent: 10,
    features: ['50,000 credits/mo', '100 req/min', '10 concurrent crawls', 'Priority support', 'Webhooks'],
    highlighted: true,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 249,
    credits: 250_000,
    rateLimit: 500,
    concurrent: 50,
    features: ['250,000 credits/mo', '500 req/min', '50 concurrent crawls', 'Dedicated support', 'SLA'],
  },
];
