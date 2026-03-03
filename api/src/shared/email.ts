// ---------------------------------------------------------------------------
// TheOneCrawl — Email service via AWS SES
// ---------------------------------------------------------------------------

import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';

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
    console.warn('[email] SES not configured, skipping email to', to);
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
    console.error('[email] Failed to send:', err);
    return false;
  }
}

export async function sendPasswordResetEmail(to: string, resetToken: string): Promise<boolean> {
  const resetUrl = `https://app.theonecrawl.app/reset-password?token=${resetToken}`;
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

export async function sendWelcomeEmail(to: string, name: string): Promise<boolean> {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Welcome to TheOneCrawl, ${name}!</h2>
      <p>Your account is ready. You have 500 free credits to get started.</p>
      <p><a href="https://app.theonecrawl.app/dashboard/api-keys" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none;">Create your API key</a></p>
      <p style="color: #666; font-size: 14px;">Need help? Check out our <a href="https://theonecrawl.app/docs">documentation</a>.</p>
    </div>
  `;
  return sendEmail(to, 'Welcome to TheOneCrawl', html);
}
