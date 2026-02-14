"use client";

import { useState, useMemo } from "react";
import { Calendar, Clock } from "lucide-react";
import { useGetSlotById } from "@/hooks/useSlots";
import { DateSelector } from "./DateSelector";
import { useBookingMutation } from "@/hooks/usebooking";

interface BookingCardProps {
  tutorId: string;
}
type AvailabilitySlot = {
  id: string;
  tutorId: string;
  day: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function BookingCard({ tutorId }: BookingCardProps) {
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState<string>("");
const {mutate,isPending}=useBookingMutation()
  const { data: slots, isLoading, isError } = useGetSlotById(tutorId);

  const allSlots: AvailabilitySlot[] = slots?.data || [];



  // Get selected day (SAT, SUN etc.)
  const selectedDay = useMemo(() => {
    if (!selectedDate) return null;

    return new Date(selectedDate)
      .toLocaleDateString("en-US", { weekday: "short" })
      .toUpperCase();
  }, [selectedDate]);

  // Filter slots by selected day
  const filteredSlots = useMemo(() => {
    if (!selectedDay) return [];

    const result = allSlots.filter(
      (slot: AvailabilitySlot) => slot.day === selectedDay,
    );

    return result;
  }, [allSlots, selectedDay]);

  // Format time

  const formatTo12Hour = (time: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const adjustedHours = hours % 12 || 12; 
    const adjustedMinutes = minutes.toString().padStart(2, "0");
    return `${adjustedHours}:${adjustedMinutes} ${period}`;
  };

  const handleBooking = () => {
    if (!selectedSlot) {
      alert("Please select a time slot");
      return;
    }
    console.log("Sleceted Slot",selectedSlot);
 const createDateTime = (dateStr: string, timeStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const [hours, minutes] = timeStr.split(":").map(Number);

  
    const date = new Date(year, month - 1, day, hours, minutes);

    return date.toISOString();
  };

  const startDateTime = createDateTime(
    selectedDate,
    selectedSlot.startTime
  );

  const endDateTime = createDateTime(
    selectedDate,
    selectedSlot.endTime
  );

  const bookingInfo = {
    tutorId: selectedSlot.tutorId,
    slotId: selectedSlot.id,
    date: selectedDate,
    startTime: startDateTime,
    endTime: endDateTime,
  };

console.log(bookingInfo);
mutate(bookingInfo)
  };

  if (isLoading) return <p>Loading slots...</p>;
  if (isError) return <p>Failed to load slots</p>;

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-gray-200 sticky top-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Book a Session</h2>

      {/* Date Selection */}
      <div className="mb-6 ">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
          <Calendar className="w-4 h-4" />
          Select Date
        </label>

        <DateSelector
          selectedDate={selectedDate}
          onSelectDate={(date) => {
            setSelectedDate(date);
            setSelectedSlot(null);
          }}
        />
      </div>

      {/* Time Selection */}
      <div className="mb-6">
        <label className="flex  items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
          <Clock className="w-4 h-4" />
          Select Time
        </label>

        {filteredSlots.length === 0 && (
          <p className="text-sm text-gray-500">
            No available slots for this day
          </p>
        )}

        <div className="grid grid-cols-2 gap-2">
          {filteredSlots.map((slot: AvailabilitySlot) => {
            const isSelected = selectedSlot?.id === slot.id;
            const timeLabel = `${formatTo12Hour(slot.startTime)} - ${formatTo12Hour(slot.endTime)}`;
           
            return (
              <button
                key={slot.id}
                onClick={() => setSelectedSlot(slot)}
                className={`p-3 rounded-xl border-2 text-sm font-medium ${
                  slot.isBooked
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : isSelected
                      ? "text-white"
                      : "border-gray-200 bg-white text-gray-700"
                }`}
                style={
                  isSelected
                    ? { backgroundColor: "var(--color-custom-primary)" }
                    : {}
                }
              >
                {timeLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Booking Button */}
      <button
        onClick={handleBooking}
        disabled={!selectedSlot}
        className={`w-full py-4 rounded-xl font-bold text-white ${
          selectedSlot ? "" : "bg-gray-300 cursor-not-allowed"
        }`}
        style={
          selectedSlot ? { backgroundColor: "var(--color-custom-primary)" } : {}
        }
      >
        
        {isPending? "Confirming Your Booking" :"Confirm Booking"}
      </button>
    </div>
  );
}
