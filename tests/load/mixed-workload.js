// ---------------------------------------------------------------------------
// TheOneCrawl — k6 mixed workload test
// Realistic mix: 70% scrape, 20% crawl, 10% extract
// Usage: k6 run --env API_URL=https://api.theonecrawl.app --env API_KEY=tc_live_xxx tests/load/mixed-workload.js
// ---------------------------------------------------------------------------

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';

const errorRate = new Rate('errors');
const scrapeCount = new Counter('scrape_requests');
const crawlCount = new Counter('crawl_requests');
const extractCount = new Counter('extract_requests');

export const options = {
  stages: [
    { duration: '1m', target: 20 },
    { duration: '3m', target: 50 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<20000'],
    errors: ['rate<0.15'],
  },
};

const API_URL = __ENV.API_URL || 'http://localhost:3001';
const API_KEY = __ENV.API_KEY || 'tc_live_test';

const urls = [
  'https://example.com',
  'https://httpbin.org/html',
  'https://jsonplaceholder.typicode.com',
];

function doScrape() {
  const url = urls[Math.floor(Math.random() * urls.length)];
  scrapeCount.add(1);

  const res = http.post(
    `${API_URL}/v1/scrape`,
    JSON.stringify({ url, formats: ['markdown'], onlyMainContent: true }),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      timeout: '30s',
    },
  );

  return check(res, { 'scrape ok': (r) => r.status === 200 });
}

function doCrawl() {
  const url = urls[Math.floor(Math.random() * urls.length)];
  crawlCount.add(1);

  const res = http.post(
    `${API_URL}/v1/crawl`,
    JSON.stringify({
      url,
      limit: 3,
      scrapeOptions: { formats: ['markdown'] },
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );

  return check(res, { 'crawl queued': (r) => r.status === 201 });
}

function doExtract() {
  extractCount.add(1);

  const res = http.post(
    `${API_URL}/v1/extract`,
    JSON.stringify({
      urls: ['https://example.com'],
      prompt: 'Extract the page title',
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      timeout: '60s',
    },
  );

  return check(res, { 'extract ok': (r) => r.status === 200 || r.status === 402 });
}

export default function () {
  const rand = Math.random();
  let success;

  if (rand < 0.7) {
    success = doScrape();
  } else if (rand < 0.9) {
    success = doCrawl();
  } else {
    success = doExtract();
  }

  errorRate.add(!success);
  sleep(0.5 + Math.random() * 2);
}
