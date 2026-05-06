import Stripe from "stripe";
import { prisma } from "../../lib/prisma";
import { PaymentStatus } from "../../../prisma/generated/prisma/enums";

const handleStripeWebHookEvent = async (event: Stripe.Event) => {
  const existingPayment = await prisma.payment.findUnique({
    where: {
      stripeEventId: event.id,
    },
  });
  if (existingPayment) {
    return { message: "Payment already processed" };
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const bookingId = session.metadata?.bookingId;
      const paymentId = session.metadata?.paymentId;
      if (!bookingId || !paymentId) {
        return { message: "Invalid session metadata" };
      }
      const booking = await prisma.booking.findUnique({
        where: {
          booking_id: bookingId,
        },
      });
      await prisma.$transaction(async (tx) => {
        await tx.booking.update({
          where: {
            booking_id: bookingId,
          },
          data: {
            paymentStatus:
              session.payment_status === "paid"
                ? PaymentStatus.PAID
                : PaymentStatus.UNPAID,
          },
        });
        await tx.payment.update({
          where: {
            id: paymentId,
          },
          data: {
            status:
              session.payment_status === "paid"
                ? PaymentStatus.PAID
                : PaymentStatus.UNPAID,
            paymentGatewayData: session as any,
          },
        });
      });
    
      break;
    case "checkout.session.expired": {
      const session = event.data.object;
    

      break;
    }
    case "payment_intent.payment_failed":
      {
        const session = event.data.object;
      
        break;
      }
      break;
    default: {
     
      break;
    }
  }
  return { message: "Payment processed successfully" };
};
export const paymentService = {
  handleStripeWebHookEvent,
};