export type BookingInfo = {
  tutorId: string;
  slotId: string;
  date: string;        // "YYYY-MM-DD" format
  startTime: string;   // ISO string, ex: "2026-02-14T13:00:00.000Z"
  endTime: string;     // ISO string
};
