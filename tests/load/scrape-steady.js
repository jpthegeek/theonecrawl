// ---------------------------------------------------------------------------
// TheOneCrawl — k6 steady-state scrape load test
// 50 concurrent VUs, 10 req/s target, 5 minutes sustained
// Usage: k6 run --env API_URL=https://api.theonecrawl.app --env API_KEY=tc_live_xxx tests/load/scrape-steady.js
// ---------------------------------------------------------------------------

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('errors');
const scrapeDuration = new Trend('scrape_duration');

export const options = {
  stages: [
    { duration: '30s', target: 10 },  // Ramp up
    { duration: '4m', target: 50 },   // Sustained load
    { duration: '30s', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<15000'],  // 95th percentile under 15s
    errors: ['rate<0.1'],                // Error rate under 10%
  },
};

const API_URL = __ENV.API_URL || 'http://localhost:3001';
const API_KEY = __ENV.API_KEY || 'tc_live_test';

const urls = [
  'https://example.com',
  'https://httpbin.org/html',
  'https://jsonplaceholder.typicode.com',
];

export default function () {
  const url = urls[Math.floor(Math.random() * urls.length)];

  const res = http.post(
    `${API_URL}/v1/scrape`,
    JSON.stringify({
      url,
      formats: ['markdown'],
      onlyMainContent: true,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      timeout: '30s',
    },
  );

  const success = check(res, {
    'status is 200': (r) => r.status === 200,
    'has markdown': (r) => {
      try {
        const body = JSON.parse(r.body);
        return body.success === true;
      } catch {
        return false;
      }
    },
  });

  errorRate.add(!success);
  scrapeDuration.add(res.timings.duration);

  sleep(0.5 + Math.random());
}
