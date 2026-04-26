import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center border border-gray-100">
        <div className="flex justify-center mb-6">
          <XCircle className="w-20 h-20 text-red-400" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Payment Cancelled
        </h1>
        <p className="text-gray-500 mb-8">
          Your payment was not completed. Your booking has not been confirmed.
          You can try again or choose a different session.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/tutors"
            className="w-full py-3 rounded-xl font-semibold text-white text-center"
            style={{ backgroundColor: "var(--color-custom-primary)" }}
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="w-full py-3 rounded-xl font-semibold text-gray-700 border border-gray-200 bg-white text-center hover:bg-gray-50 transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
