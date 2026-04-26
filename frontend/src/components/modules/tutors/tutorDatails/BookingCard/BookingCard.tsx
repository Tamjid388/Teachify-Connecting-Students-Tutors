"use client";

import { useState, useMemo, useTransition } from "react";
import { Calendar, Clock } from "lucide-react";
import { DateSelector } from "./DateSelector";
import { createBookingAction } from "@/actions/booking.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AvailabilitySlot } from "../TutorDetails";

interface BookingCardProps {
  slots: AvailabilitySlot[];
}

export default function BookingCard({ slots }: BookingCardProps) {
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const selectedDay = useMemo(() => {
    if (!selectedDate) return null;
    return new Date(selectedDate)
      .toLocaleDateString("en-US", { weekday: "short" })
      .toUpperCase();
  }, [selectedDate]);

  const filteredSlots = useMemo(() => {
    if (!selectedDay) return [];
    return slots.filter((slot) => slot.day === selectedDay);
  }, [slots, selectedDay]);

  const formatTo12Hour = (time: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const adjustedHours = hours % 12 || 12;
    const adjustedMinutes = minutes.toString().padStart(2, "0");
    return `${adjustedHours}:${adjustedMinutes} ${period}`;
  };

  const createDateTime = (dateStr: string, timeStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const [hours, minutes] = timeStr.split(":").map(Number);
    return new Date(year, month - 1, day, hours, minutes).toISOString();
  };

  const handleBooking = () => {
    if (!selectedSlot || !selectedDate) {
      toast.error("Please select a date and time slot");
      return;
    }

    const bookingInfo = {
      tutorId: selectedSlot.tutorId,
      slotId: selectedSlot.id,
      date: selectedDate,
      startTime: createDateTime(selectedDate, selectedSlot.startTime),
      endTime: createDateTime(selectedDate, selectedSlot.endTime),
    };

    startTransition(async () => {
      try {
        const response = await createBookingAction(bookingInfo);
        const paymentUrl =
          response?.result?.paymentUrl ?? response?.paymentUrl;

        if (paymentUrl) {
          toast.success("Booking confirmed! Redirecting to payment...");
          window.location.href = paymentUrl;
        } else {
          toast.success("Booking request sent successfully!");
          setSelectedSlot(null);
          setSelectedDate("");
          router.refresh();
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong",
        );
      }
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-gray-200 sticky top-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Book a Session</h2>

      {/* Date Selection */}
      <div className="mb-6">
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
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
          <Clock className="w-4 h-4" />
          Select Time
        </label>

        {filteredSlots.length === 0 && (
          <p className="text-sm text-gray-500">
            No available slots for this day
          </p>
        )}

        <div className="grid grid-cols-2 gap-2">
          {filteredSlots.map((slot) => {
            const isSelected = selectedSlot?.id === slot.id;
            const timeLabel = `${formatTo12Hour(slot.startTime)} - ${formatTo12Hour(slot.endTime)}`;

            return (
              <button
                key={slot.id}
                onClick={() => !slot.isBooked && setSelectedSlot(slot)}
                disabled={slot.isBooked}
                className={`p-3 rounded-xl border-2 text-sm font-medium ${
                  slot.isBooked
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : isSelected
                      ? "text-white"
                      : "border-gray-200 bg-white text-gray-700"
                }`}
                style={
                  isSelected && !slot.isBooked
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
        disabled={!selectedSlot || isPending}
        className={`w-full py-4 rounded-xl font-bold text-white ${
          selectedSlot && !isPending ? "" : "bg-gray-300 cursor-not-allowed"
        }`}
        style={
          selectedSlot && !isPending
            ? { backgroundColor: "var(--color-custom-primary)" }
            : {}
        }
      >
        {isPending ? "Confirming Your Booking..." : "Confirm Booking"}
      </button>
    </div>
  );
}
