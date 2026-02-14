import { env } from "@/env";
import { bookingService } from "@/services/booking-service";
import { BookingInfo } from "@/Types/TBooking";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const createBooking = async (data:BookingInfo) => {
  const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  console.log(response);
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message );
  }

  return response.json();
};

export const getBookingById = async (userId: string) => {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}bookings/bookingById/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || "Failed to fetch bookings");
    }

  } catch (err:unknown) {
    let message = "Something went wrong while fetching bookings";
    if(err instanceof Error){
        message=err.message
    }
    throw new Error(message);
  }
};

export const useGetAllBookings = () => {
  return useQuery({
    queryKey: ["booking"],
    queryFn: bookingService.getAllBookings,
    staleTime: 1000 * 60 * 5, 
  });
};

export const useGetBookingById=(userId: string)=>{
    return useQuery({
        queryKey:["booking",userId],
        queryFn:()=>getBookingById(userId)
    })
}

export const useBookingMutation = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: createBooking,
    onSuccess:()=>{
        queryclient.invalidateQueries({queryKey:["slot"]})
        toast.success("Booking request sent successfully!")
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });
};
