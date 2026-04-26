import Booking from "@/components/modules/tutor-dashboard/tutor-bookings/Booking";
import { bookingService } from "@/services/booking-service";
import { cookies } from "next/headers";

export default async function TutorBookings() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const data = await bookingService.getAllBookings(cookieHeader).catch(() => null);
  const bookings = data?.bookings ?? [];

  return (
    <div>
      <h1 className="text-4xl font-bold text-custom-primary">
        Welcome To Tutor Dashboard
      </h1>
      <main>
        <Booking bookings={bookings} />
      </main>
    </div>
  );
}
