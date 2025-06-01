import TourBooking from "../../models/tour/booking.js";

export const createBooking = async (req, res) => {
    const { ...data } = req.body;
    try {
        const newBooking = await TourBooking.create(data);
        res.status(201).json(newBooking);
    } catch (error) {

        console.error("Error creating booking:", error);
        res.status(500).json({
            message: 'Something went wrong while creating the booking',
            error: error.message,
        });
    }
}

export const getBookings = async (req, res) => {
    try {
        const bookings = await TourBooking.find();
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({
            message: 'Something went wrong while fetching bookings',
            error: error.message,
        });
    }
};
export const getBookingById = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const booking = await TourBooking.find({ bookingId: bookingId });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    }
    catch (error) {
        console.error("Error fetching booking by ID:", error);
        res.status(500).json({
            message: 'Something went wrong while fetching the booking',
            error: error.message,
        });
    }
}

export const getTotalSell = async (req, res) => {
    try {
        const result = await TourBooking.aggregate([
            {
                $group: {
                    _id: null,
                    totalSell: { $sum: "$price" },
                },
            },
        ]);

        const totalSell = result.length > 0 ? result[0].totalSell : 0;

        res.status(200).json({ totalSell });
    } catch (error) {
        console.error("Error getting total sell:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
export const updateBooking = async (req, res) => {
    const { bookingId } = req.params;
    const data = req.body;

    try {
        const booking = await TourBooking.findOneAndUpdate({ bookingId: bookingId }, data, { new: true });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    }
    catch (error) {
        console.error("Error updating booking:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
export const deleteBooking = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const booking = await TourBooking.findOneAndDelete({ bookingId: bookingId });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    }
    catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}