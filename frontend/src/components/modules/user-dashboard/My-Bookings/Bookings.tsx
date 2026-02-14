"use client"
import { useGetAllBookings } from "@/hooks/usebooking"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import WriteReview from "./WriteReview"
import { useReviewMutation } from "@/hooks/userReview"
import { Button } from "@/components/ui/button"

export default function Bookings() {
    const { data, isLoading, error } = useGetAllBookings();
const {mutate}=useReviewMutation()
    const bookings = data?.bookings || [];
    // console.log(bookings)

    // Handle review submission
    const handleReviewSubmit = (booking_id: string, reviewData: { rating: number; comment: string },tutor_id:string) => {
        const payload={
            booking_id,
            ...reviewData

        }
        console.log('Review submitted for booking:', payload);
mutate(payload)
        // TODO: Send review to backend API
        // Example: Call mutation hook here
        // reviewMutation.mutate({ bookingId, ...reviewData })
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-lg">Loading bookings...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-lg text-red-500">Error loading bookings</div>
            </div>
        );
    }

    if (bookings.length === 0) {
        return (
            <div className="flex items-center justify-center p-8">
                <p className="text-muted-foreground">No bookings found.</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Booking ID</TableHead>
                            <TableHead >Status</TableHead>
                            <TableHead>Payment Status</TableHead>
                            <TableHead>Mode</TableHead>
                            <TableHead>Start Time</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings.map((item: any) => {
                            const {
                                booking_id,
                                bookingStatus,
                                paymentStatus,
                                startTime,
                                tutionMode,tutor_id,
                               isReviewed
                            } = item;

                            return (
                                <TableRow key={booking_id}>
                                    <TableCell className="font-medium">{booking_id}</TableCell>
                                    <TableCell className="">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${bookingStatus === 'COMPLETED'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {bookingStatus}
                                        </span>
                                    </TableCell>
                                    <TableCell>{paymentStatus}</TableCell>
                                    <TableCell>{tutionMode}</TableCell>
                                    <TableCell>{new Date(startTime).toLocaleString()}</TableCell>
                                    <TableCell className="text-right">
                                        {bookingStatus === 'COMPLETED' ? (
                                         isReviewed ? (
                                            <Button disabled>
                                                Already Reviewed
                                            </Button>
                                         ) : (
                                            <WriteReview
                                                bookingId={booking_id}
                                                onSubmit={(reviewData) => handleReviewSubmit(booking_id, reviewData,tutor_id)}
                                            />
                                         )
                                        ) : (
                                            <span className="text-sm text-muted-foreground">
                                                Booking not completed yet
                                            </span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}