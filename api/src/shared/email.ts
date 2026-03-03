// ---------------------------------------------------------------------------
// TheOneCrawl — Email service via AWS SES
// ---------------------------------------------------------------------------

import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
import { logger } from './logger.js';

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const FROM_ADDRESS = 'TheOneCrawl <noreply@theonecrawl.app>';
const CONFIGURATION_SET = 'theonecrawl-transactional';

let sesClient: SESv2Client | null = null;

function getSESClient(): SESv2Client | null {
  if (sesClient) return sesClient;
  const accessKeyId = process.env['AWS_SES_ACCESS_KEY_ID'];
  const secretAccessKey = process.env['AWS_SES_SECRET_ACCESS_KEY'];
  const region = process.env['AWS_SES_REGION'] || 'us-east-1';
  if (!accessKeyId || !secretAccessKey) return null;

  sesClient = new SESv2Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });
  return sesClient;
}

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text?: string,
): Promise<boolean> {
  const client = getSESClient();
  if (!client) {
    logger.warn('SES not configured, skipping email', { to });
    return false;
  }

  try {
    await client.send(new SendEmailCommand({
      FromEmailAddress: FROM_ADDRESS,
      Destination: { ToAddresses: [to] },
      Content: {
        Simple: {
          Subject: { Data: subject },
          Body: {
            Html: { Data: html },
            ...(text ? { Text: { Data: text } } : {}),
          },
        },
      },
      ConfigurationSetName: CONFIGURATION_SET,
    }));
    return true;
  } catch (err) {
    logger.error('Failed to send email', { to, error: err instanceof Error ? err.message : String(err) });
    return false;
  }
}

export async function sendPasswordResetEmail(to: string, resetToken: string): Promise<boolean> {
  const resetUrl = `https://app.theonecrawl.app/reset-password?token=${encodeURIComponent(resetToken)}`;
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Reset your password</h2>
      <p>You requested a password reset for your TheOneCrawl account.</p>
      <p><a href="${resetUrl}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none;">Reset Password</a></p>
      <p style="color: #666; font-size: 14px;">This link expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>
    </div>
  `;
  return sendEmail(to, 'Reset your TheOneCrawl password', html);
}

export async function sendPaymentFailedEmail(to: string, planName: string): Promise<boolean> {
  const safeplan = escapeHtml(planName);
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Payment failed</h2>
      <p>We were unable to process payment for your TheOneCrawl <strong>${safeplan}</strong> plan.</p>
      <p>Please update your payment method to avoid service interruption.</p>
      <p><a href="https://app.theonecrawl.app/dashboard/billing" style="display: inline-block; background: #dc2626; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none;">Update Payment Method</a></p>
      <p style="color: #666; font-size: 14px;">If you believe this is an error, please contact support.</p>
    </div>
  `;
  return sendEmail(to, 'Payment failed for your TheOneCrawl subscription', html);
}

export async function sendVerificationEmail(to: string, token: string): Promise<boolean> {
  const verifyUrl = `https://app.theonecrawl.app/verify-email?token=${encodeURIComponent(token)}`;
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Verify your email address</h2>
      <p>Thanks for signing up for TheOneCrawl! Please verify your email to activate your account.</p>
      <p><a href="${verifyUrl}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none;">Verify Email</a></p>
      <p style="color: #666; font-size: 14px;">This link expires in 24 hours. If you didn't create this account, you can safely ignore this email.</p>
    </div>
  `;
  return sendEmail(to, 'Verify your TheOneCrawl email', html);
}

export async function sendWelcomeEmail(to: string, name: string): Promise<boolean> {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Welcome to TheOneCrawl, ${escapeHtml(name)}!</h2>
      <p>Your account is ready. You have 500 free credits to get started.</p>
      <p><a href="https://app.theonecrawl.app/dashboard/api-keys" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none;">Create your API key</a></p>
      <p style="color: #666; font-size: 14px;">Need help? Check out our <a href="https://theonecrawl.app/docs">documentation</a>.</p>
    </div>
  `;
  return sendEmail(to, 'Welcome to TheOneCrawl', html);
}
