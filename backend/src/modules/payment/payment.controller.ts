import { Request, Response } from "express";
import { paymentService } from "./payment.service";
import { stripe } from "../../config/stripe";
import Stripe from "stripe";

const handleStripeWebHookEvent = async (req: Request, res: Response) => {
  try {
    const signature = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
    if (!signature || !webhookSecret) {
      return res.status(401).json({ message: "Signature or Webhook Secret Required" });
    }
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      webhookSecret,
    );
  } catch (err: any) {
    return res.status(400).json({ message: `Webhook verification failed: ${err.message}` });
  }
    const result = await paymentService.handleStripeWebHookEvent(event);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const paymentController = {
  handleStripeWebHookEvent,
};
