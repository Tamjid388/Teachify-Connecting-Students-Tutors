"use client"

import { useGetAllBookings, useUpdateBookingStatus} from "@/hooks/usebooking";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { CloudCog } from "lucide-react";

export default function Booking() {
    const { data, isLoading, error } = useGetAllBookings();
    const {mutate}=useUpdateBookingStatus()
    const [selectedStatus, setSelectedStatus] = useState("ALL");
    const bookings = data?.bookings || [];

    if (isLoading) {
        return <div className="p-6">Loading bookings...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-500">Error loading bookings</div>;
    }

  
    const filteredBookings =
        selectedStatus === "ALL"
            ? bookings
            : bookings.filter((booking: any) => booking.bookingStatus === selectedStatus);

    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case "PAID":
                return "bg-green-500";
            case "UNPAID":
                return "bg-red-500 dark:text-white";
            case "REFUNDED":
                return "bg-orange-500";
            default:
                return "bg-gray-500";
        }
    };

    const handleStatusChange = (bookingId: string, status: string) => {
        // TODO: call mutation to update status
        console.log("Update booking:", bookingId, "to", status);
        const payload={id:bookingId,
            bookingStatus:status}
            console.log(payload)
            mutate(payload)
       
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

            {/* ✅ Filter By Status */}
            <div className="mb-4 w-48">
                <Select
                    value={selectedStatus}
                    onValueChange={(value) => setSelectedStatus(value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="ACCEPTED">Accepted</SelectItem>
                        <SelectItem value="REJECTED">Rejected</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableCaption>A list of all your bookings</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Mode</TableHead>
                            <TableHead>Booking Status</TableHead>
                            <TableHead>Payment Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredBookings.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-muted-foreground">
                                    No bookings found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredBookings.map((booking: any) => (
                                <TableRow key={booking.booking_id}>
                                    <TableCell className="font-medium flex flex-col">
                                        {booking.student?.name || "N/A"}
                                       <h1> {booking.booking_id}</h1>
                                    </TableCell>
                                    <TableCell>{booking.student?.email || "N/A"}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">
                                                {format(new Date(booking.startTime), "MMM dd, yyyy")}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                {format(new Date(booking.startTime), "hh:mm a")} -{" "}
                                                {format(new Date(booking.endTime), "hh:mm a")}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{booking.duration} min</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{booking.tutionMode}</Badge>
                                    </TableCell>
                                    <TableCell>
                                       
                                        {booking.bookingStatus !== "COMPLETED" ? (
                                            <Select
                                                value={booking.bookingStatus}
                                                onValueChange={(value) =>
                                                    handleStatusChange(booking.booking_id, value)
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ACCEPTED">Accept</SelectItem>
                                                    <SelectItem value="REJECTED">Reject</SelectItem>
                                                  <SelectItem value="PENDING">Pending</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        ) : (
                                            <div className="font-medium">{booking.bookingStatus}</div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                                            {booking.paymentStatus}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
