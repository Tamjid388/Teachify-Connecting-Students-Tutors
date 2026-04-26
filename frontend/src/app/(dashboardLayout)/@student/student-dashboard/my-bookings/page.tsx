import Bookings from "@/components/modules/user-dashboard/My-Bookings/Bookings";
import { bookingService } from "@/services/booking-service";
import { cookies } from "next/headers";

export default async function MyBookingsPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const data = await bookingService.getAllBookings(cookieHeader).catch(() => null);
  const bookings = data?.bookings ?? [];
 console.log(bookings);
  return (
    <div>
      <h1 className="text-4xl font-bold text-custom-primary">My Bookings</h1>
      <Bookings bookings={bookings} />
    </div>
  );
}