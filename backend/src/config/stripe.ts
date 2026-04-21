import "dotenv/config";
import Stripe from "stripe";

function requireStripeSecretKey(): string {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return key;
}

/**
 * Server-side Stripe SDK instance. Requires `STRIPE_SECRET_KEY` in the environment.
 */
export const stripe = new Stripe(requireStripeSecretKey(), {
  typescript: true,
  maxNetworkRetries: 2,
});


export function getStripeWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!secret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not set");
  }
  return secret;
}



