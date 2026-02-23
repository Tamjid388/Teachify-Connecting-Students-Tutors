"use client";
import { useGetSlotById } from "@/hooks/useSlots";
import { useSession } from "@/lib/auth-client";
import { Calendar, Clock, CheckCircle2, XCircle } from "lucide-react";
import { format,parse } from "date-fns";

interface IBooking {
    booking_id: string;
    bookingStatus: string;
    startTime: string;
    endTime: string;
    duration: number;
    tutionMode: string;
    paymentStatus: string;
    studentId: string;
    isReviewed: boolean;
}

interface ISlot {
    id: string;
    day: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
    bookings: IBooking[];
}

const DAYS_ORDER = ["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"];

export default function TutorSlots() {
    const { data: session } = useSession();
    const userId = session?.user?.id || "";
    const { data: response, isLoading, isError } = useGetSlotById(userId);

    const slots: ISlot[] = response?.data || [];
console.log(slots)
    // Group slots by day
    const groupedSlots = slots.reduce((acc: Record<string, ISlot[]>, slot) => {
      console.log(acc)
        if (!acc[slot.day]) {
            acc[slot.day] = [];
        }
        acc[slot.day].push(slot);
        return acc;
    }, {});

    // Sort days based on DAYS_ORDER
    const sortedDays = Object.keys(groupedSlots).sort(
        (a, b) => DAYS_ORDER.indexOf(a) - DAYS_ORDER.indexOf(b)
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-custom-primary"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4 text-red-500 bg-red-50 rounded-lg">
                Failed to load slots. Please try again later.
            </div>
        );
    }

    if (!slots.length) {
        return (
            <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 text-lg">No slots available. Add some slots above!</p>
            </div>
        );
    }
    const convertTo12Hour = (time24:string) => {
  // 1. String ke date object-e convert kora (24h format: HH:mm)
  const date = parse(time24, 'HH:mm', new Date());

  // 2. Format kora (12h format: hh:mm aa)
  return format(date, 'hh:mm aa'); 
};

    return (
        <div className="space-y-8 mt-8">
            <div className="flex items-center gap-2 border-b pb-2">
                <Clock className="w-5 h-5 text-custom-primary" />
                <h2 className="text-xl font-semibold text-gray-800">Your Availability Schedule</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
                {sortedDays.map((day) => (
                    <div key={day} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gray-50 px-4 py-2 border-b">
                            <span className="font-bold text-gray-700">{day}</span>
                        </div>
                        <div className="p-4 space-y-3 ">
                            {groupedSlots[day]
                                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                                .map((slot) => (
                                    <div
                                        key={slot.id}
                                        className={`flex flex-col  items-start gap-2 justify-between p-3 rounded-lg border transition-all ${slot.isBooked
                                                ? "bg-red-50 border-red-100 text-red-800"
                                                : "bg-green-50 border-green-100 text-green-800"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 opacity-70" />
                                            <span className="font-medium">
                                                {convertTo12Hour(slot.startTime)} - {convertTo12Hour(slot.endTime)}
                                            </span>
                                        </div>
                                        <div>
                                            {slot.isBooked ? (
                                                <div className="flex items-center gap-1 text-xs bg-red-100 px-2 py-1 rounded-full font-semibold uppercase tracking-wider">
                                                    <XCircle className="w-3 h-3" />
                                                    Booked
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1 text-xs bg-green-100 px-2 py-1 rounded-full font-semibold uppercase tracking-wider">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    Available
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

