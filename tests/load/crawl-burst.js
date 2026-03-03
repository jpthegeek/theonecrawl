// ---------------------------------------------------------------------------
// TheOneCrawl — k6 crawl burst test
// Queue 100 crawl jobs in 10 seconds, monitor drain time
// Usage: k6 run --env API_URL=https://api.theonecrawl.app --env API_KEY=tc_live_xxx tests/load/crawl-burst.js
// ---------------------------------------------------------------------------

import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { Rate, Counter } from 'k6/metrics';

const queuedJobs = new Counter('queued_jobs');
const queueErrors = new Rate('queue_errors');

export const options = {
  scenarios: {
    burst: {
      executor: 'shared-iterations',
      vus: 10,
      iterations: 100,
      maxDuration: '30s',
    },
    monitor: {
      executor: 'constant-vus',
      vus: 1,
      duration: '10m',
      startTime: '15s',
    },
  },
  thresholds: {
    queue_errors: ['rate<0.2'],
  },
};

const API_URL = __ENV.API_URL || 'http://localhost:3001';
const API_KEY = __ENV.API_KEY || 'tc_live_test';

const targets = [
  'https://example.com',
  'https://httpbin.org',
  'https://jsonplaceholder.typicode.com',
];

export default function () {
  if (__ITER === undefined || __VU === undefined) return;

  const scenario = __ENV.K6_SCENARIO || exec.scenario.name;

  if (scenario === 'burst') {
    // Queue crawl jobs
    const url = targets[Math.floor(Math.random() * targets.length)];
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

    const ok = check(res, {
      'crawl queued': (r) => r.status === 201,
    });

    if (ok) queuedJobs.add(1);
    else queueErrors.add(1);
  } else {
    // Monitor queue drain
    const res = http.get(`${API_URL}/health`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

    if (res.status === 200) {
      try {
        const body = JSON.parse(res.body);
        console.log(
          `Queue: ${body.queue?.queued || 0} queued, ${body.queue?.active || 0} active`,
        );
      } catch {}
    }

    sleep(5);
  }
}

import exec from 'k6/execution';
