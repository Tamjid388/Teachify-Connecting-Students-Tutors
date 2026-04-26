import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center border border-gray-100">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-500" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Payment Successful!
        </h1>
        <p className="text-gray-500 mb-8">
          Your booking has been confirmed and payment received. You can view
          your session details in your dashboard.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/student-dashboard/my-bookings"
            className="w-full py-3 rounded-xl font-semibold text-white text-center"
            style={{ backgroundColor: "var(--color-custom-primary)" }}
          >
            View My Bookings
          </Link>
          <Link
            href="/tutors"
            className="w-full py-3 rounded-xl font-semibold text-gray-700 border border-gray-200 bg-white text-center hover:bg-gray-50 transition"
          >
            Browse More Tutors
          </Link>
        </div>
      </div>
    </div>
  );
}
