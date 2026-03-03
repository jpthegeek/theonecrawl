// ---------------------------------------------------------------------------
// TheOneCrawl — Billing routes (Stripe checkout, portal, webhooks)
// ---------------------------------------------------------------------------

import { Hono } from 'hono';
import Stripe from 'stripe';
import { getSession } from '../auth/sessions.js';
import { cosmosQuery, cosmosUpsert, isCosmosConfigured } from '../shared/cosmos.js';
import { setPlan } from '../billing/credits.js';
import type { AccountRecord } from '../auth/api-keys.js';
import type { CrawlPlan } from '../engine/types.js';
import { STRIPE_PRICE_IDS, PRICE_TO_PLAN } from '../shared/constants.js';
import { sendPaymentFailedEmail } from '../shared/email.js';
import { logger } from '../shared/logger.js';

export const billingRoutes = new Hono();

function getStripe(): Stripe | null {
  const key = process.env['STRIPE_SECRET_KEY'];
  if (!key) return null;
  return new Stripe(key, { apiVersion: '2025-01-27.acacia' as Stripe.LatestApiVersion });
}

// ---------------------------------------------------------------------------
// POST /v1/billing/checkout
// ---------------------------------------------------------------------------

billingRoutes.post('/checkout', async (c) => {
  const session = getSession(c);
  if (!session) return c.json({ success: false, error: 'Not authenticated' }, 401);

  const stripe = getStripe();
  if (!stripe) return c.json({ success: false, error: 'Billing not configured' }, 503);

  const body = await c.req.json().catch(() => null) as { plan?: string } | null;
  const plan = body?.plan as CrawlPlan | undefined;
  if (!plan || !STRIPE_PRICE_IDS[plan]) {
    return c.json({ success: false, error: 'Invalid plan' }, 400);
  }

  // Get or create Stripe customer
  const accounts = await cosmosQuery<AccountRecord>(
    'accounts',
    'SELECT * FROM c WHERE c.id = @id AND c.type = "account"',
    [{ name: '@id', value: session.accountId }],
  );
  const account = accounts[0];
  if (!account) return c.json({ success: false, error: 'Account not found' }, 404);

  let customerId = account.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: account.email,
      metadata: { accountId: account.id },
    });
    customerId = customer.id;
    await cosmosUpsert('accounts', { ...account, stripe_customer_id: customerId, updated_at: new Date().toISOString() });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: STRIPE_PRICE_IDS[plan], quantity: 1 }],
    success_url: `https://app.theonecrawl.app/dashboard/billing?success=true`,
    cancel_url: `https://app.theonecrawl.app/dashboard/billing?canceled=true`,
    metadata: { accountId: account.id, plan },
  });

  return c.json({ success: true, url: checkoutSession.url });
});

// ---------------------------------------------------------------------------
// POST /v1/billing/portal
// ---------------------------------------------------------------------------

billingRoutes.post('/portal', async (c) => {
  const session = getSession(c);
  if (!session) return c.json({ success: false, error: 'Not authenticated' }, 401);

  const stripe = getStripe();
  if (!stripe) return c.json({ success: false, error: 'Billing not configured' }, 503);

  const accounts = await cosmosQuery<AccountRecord>(
    'accounts',
    'SELECT * FROM c WHERE c.id = @id AND c.type = "account"',
    [{ name: '@id', value: session.accountId }],
  );
  const account = accounts[0];
  if (!account?.stripe_customer_id) {
    return c.json({ success: false, error: 'No billing account found' }, 404);
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: account.stripe_customer_id,
    return_url: 'https://app.theonecrawl.app/dashboard/billing',
  });

  return c.json({ success: true, url: portalSession.url });
});

// ---------------------------------------------------------------------------
// POST /v1/billing/webhook
// ---------------------------------------------------------------------------

billingRoutes.post('/webhook', async (c) => {
  const stripe = getStripe();
  if (!stripe) return c.json({ success: false, error: 'Billing not configured' }, 503);

  const sig = c.req.header('stripe-signature');
  const webhookSecret = process.env['STRIPE_WEBHOOK_SECRET'];
  if (!sig || !webhookSecret) {
    return c.json({ success: false, error: 'Missing signature' }, 400);
  }

  const rawBody = await c.req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch {
    return c.json({ success: false, error: 'Invalid signature' }, 400);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const accountId = session.metadata?.['accountId'];
    const plan = session.metadata?.['plan'] as CrawlPlan | undefined;
    if (accountId && plan) {
      setPlan(accountId, plan);
      if (isCosmosConfigured()) {
        const accounts = await cosmosQuery<AccountRecord>(
          'accounts',
          'SELECT * FROM c WHERE c.id = @id AND c.type = "account"',
          [{ name: '@id', value: accountId }],
        );
        const account = accounts[0];
        if (account) {
          await cosmosUpsert('accounts', {
            ...account,
            plan,
            stripe_subscription_id: session.subscription as string,
            updated_at: new Date().toISOString(),
          });
        }
      }
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription;
    const customer = await stripe.customers.retrieve(sub.customer as string) as Stripe.Customer;
    const accountId = customer.metadata?.['accountId'];
    if (accountId) {
      setPlan(accountId, 'free');
      if (isCosmosConfigured()) {
        const accounts = await cosmosQuery<AccountRecord>(
          'accounts',
          'SELECT * FROM c WHERE c.id = @id AND c.type = "account"',
          [{ name: '@id', value: accountId }],
        );
        const account = accounts[0];
        if (account) {
          await cosmosUpsert('accounts', {
            ...account,
            plan: 'free',
            stripe_subscription_id: undefined,
            updated_at: new Date().toISOString(),
          });
        }
      }
    }
  }

  if (event.type === 'invoice.payment_failed') {
    const invoice = event.data.object as Stripe.Invoice;
    const customerId = invoice.customer as string;
    if (customerId) {
      try {
        const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
        const accountId = customer.metadata?.['accountId'];
        if (accountId && isCosmosConfigured()) {
          const accounts = await cosmosQuery<AccountRecord>(
            'accounts',
            'SELECT * FROM c WHERE c.id = @id AND c.type = "account"',
            [{ name: '@id', value: accountId }],
          );
          const account = accounts[0];
          if (account) {
            void sendPaymentFailedEmail(account.email, account.plan);
          }
        }
      } catch (err) {
        logger.error('Failed to handle payment_failed webhook', {
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }
  }

  if (event.type === 'customer.subscription.updated') {
    const sub = event.data.object as Stripe.Subscription;
    const priceId = sub.items.data[0]?.price?.id;
    const newPlan = priceId ? PRICE_TO_PLAN[priceId] : undefined;
    if (newPlan) {
      try {
        const customer = await stripe.customers.retrieve(sub.customer as string) as Stripe.Customer;
        const accountId = customer.metadata?.['accountId'];
        if (accountId) {
          setPlan(accountId, newPlan as CrawlPlan);
          if (isCosmosConfigured()) {
            const accounts = await cosmosQuery<AccountRecord>(
              'accounts',
              'SELECT * FROM c WHERE c.id = @id AND c.type = "account"',
              [{ name: '@id', value: accountId }],
            );
            const account = accounts[0];
            if (account) {
              await cosmosUpsert('accounts', {
                ...account,
                plan: newPlan,
                updated_at: new Date().toISOString(),
              });
            }
          }
        }
      } catch (err) {
        logger.error('Failed to handle subscription.updated webhook', {
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }
  }

  return c.json({ received: true });
});
