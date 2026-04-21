import express, { Application } from "express";

import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { tutorRouter } from "./modules/tutors/tutor.routes";
import { bookingsRouter } from "./modules/bookings/booking.routes";
import { adminRouter } from "./modules/admin/admin.router";
import { reviewRouter } from "./modules/reviews/review.routes";
import { categoryRouter } from "./modules/categories/category.routes";
import notFoundHandler from "./middleware/not-found";
import { bodyParser } from "better-auth/client";
import { paymentController } from "./modules/payment/payment.controller";

const app: Application = express();

app.use(
  cors({
    origin: process.env.App_URL,
    credentials: true,
    // methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    // allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  paymentController.handleStripeWebHookEvent,
);
app.use(express.json());

app.use("/api/tutors", tutorRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/admin", adminRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/category", categoryRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(notFoundHandler);
export default app;
