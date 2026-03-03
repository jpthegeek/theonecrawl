// ---------------------------------------------------------------------------
// TheOneCrawl — k6 distributed rate limiting verification
// Hammers a single API key to verify rate limits are enforced
// Usage: k6 run --env API_URL=https://api.theonecrawl.app --env API_KEY=tc_live_xxx tests/load/rate-limit-test.js
// ---------------------------------------------------------------------------

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Counter } from 'k6/metrics';

const rateLimited = new Counter('rate_limited_responses');
const successfulRequests = new Counter('successful_requests');

export const options = {
  scenarios: {
    hammer: {
      executor: 'constant-arrival-rate',
      rate: 30,           // 30 requests per second (should exceed most plan limits)
      timeUnit: '1s',
      duration: '2m',
      preAllocatedVUs: 50,
      maxVUs: 100,
    },
  },
  thresholds: {
    // We EXPECT rate limiting — success means 429s are returned
    rate_limited_responses: ['count>0'],
  },
};

const API_URL = __ENV.API_URL || 'http://localhost:3001';
const API_KEY = __ENV.API_KEY || 'tc_live_test';

export default function () {
  const res = http.post(
    `${API_URL}/v1/scrape`,
    JSON.stringify({
      url: 'https://example.com',
      formats: ['markdown'],
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      timeout: '10s',
    },
  );

  check(res, {
    'got response': (r) => r.status !== 0,
    'has rate limit headers': (r) => r.headers['X-Ratelimit-Limit'] !== undefined,
  });

  if (res.status === 429) {
    rateLimited.add(1);
    // Verify Retry-After header is present
    check(res, {
      'has Retry-After': (r) => r.headers['Retry-After'] !== undefined,
    });
  } else if (res.status === 200) {
    successfulRequests.add(1);
  }
}

export function handleSummary(data) {
  const limited = data.metrics.rate_limited_responses?.values?.count || 0;
  const success = data.metrics.successful_requests?.values?.count || 0;
  const total = limited + success;

  console.log(`\n=== Rate Limit Test Summary ===`);
  console.log(`Total requests: ${total}`);
  console.log(`Successful: ${success}`);
  console.log(`Rate limited (429): ${limited}`);
  console.log(`Rate limit enforcement: ${total > 0 ? ((limited / total) * 100).toFixed(1) : 0}%`);
  console.log(`===============================\n`);

  return {};
}
