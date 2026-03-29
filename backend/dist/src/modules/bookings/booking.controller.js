import { bookingServices } from "./booking.service";
const createBooking = async (req, res) => {
    try {
        const data = req.body;
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "User Id Required" });
        }
        const booking = await bookingServices.createBooking(data, userId);
        res.status(201).json(booking);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const getBookings = async (req, res) => {
    try {
        const userId = req.user?.id;
        const role = req.user?.role;
        if (!userId) {
            return res.status(401).json({ message: "User Id Required" });
        }
        const bookings = await bookingServices.getAllBookings(userId, role);
        res.status(201).json({
            success: true,
            messgae: "Bookings Retreived Successfully",
            bookings,
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Get booking by id
const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const role = req.user?.role;
        if (!id) {
            return res.status(401).json({ message: "User Id Required" });
        }
        if (!role) {
            return res.status(401).json({ message: "User role required" });
        }
        const booking = await bookingServices.getBookingById(id, role);
        if (!booking) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "No Bookings found for this user"
            });
        }
        return res.status(200).json({ success: true, data: booking });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const role = req.user?.role;
        const { bookingStatus } = req.body;
        console.log("Booking Status", bookingStatus, id);
        if (!id) {
            return res.status(401).json({ message: "User Id Required" });
        }
        if (!role) {
            return res.status(401).json({ message: "User role required" });
        }
        const booking = await bookingServices.updateBookingStatus(id, bookingStatus);
        return res.status(200).json({ success: true, data: booking });
    }
    catch (err) {
        res.status(500).json({ success: false,
            message: "Status Update Failed",
            error: err.message });
    }
};
export const bookingController = {
    createBooking,
    getBookings,
    getBookingById, updateBookingStatus
};
//# sourceMappingURL=booking.controller.js.map