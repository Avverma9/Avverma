const hotelModel = require('../../models/hotel/basicDetails');
const bookingsModel = require('../../models/booking/booking');
const { DateTime } = require('luxon'); // For date handling

exports.checkAvailability = async (req, res) => {
    const { hotelId, fromDate, toDate } = req.query;

    // Check if hotelId, fromDate, and toDate are provided
    if (!hotelId || !fromDate || !toDate) {
        return res.status(400).json({ error: 'Hotel ID, from date, and to date are required.' });
    }

    try {
        // Fetch hotel details from the database
        const hotel = await hotelModel.findOne({ hotelId });
        if (!hotel) {
            return res.status(404).json({ error: 'Hotel not found.' });
        }

        // Calculate total rooms available
        const totalRooms = hotel.rooms.reduce((total, room) => total + room.totalRooms, 0);
        const availableRooms = hotel.rooms.reduce((total, room) => total + room.countRooms, 0);

        // Parse the provided dates
        const startDate = DateTime.fromISO(fromDate);
        const endDate = DateTime.fromISO(toDate);

        // Fetch bookings for the specified hotel
        const bookings = await bookingsModel.find({ hotelId });

        // Initialize counters
        let bookedRooms = 0;
        let cancelledRooms = 0;
        let checkedInRooms = 0;
        let checkedOutRooms = 0;
        let noShowRooms = 0;
        let failedRooms = 0;
        let pendingRooms = 0;

        for (const booking of bookings) {
            const checkInDate = DateTime.fromISO(booking.checkInDate);
            const checkOutDate = DateTime.fromISO(booking.checkOutDate);
            const bookingStatus = booking.bookingStatus;

            // Skip bookings that have already checked out before the fromDate
            if (checkOutDate < startDate) {
                continue; // Booking has already checked out
            }

            // Skip bookings that check in after the toDate
            if (checkInDate > endDate) {
                continue; // Booking starts after the toDate
            }

            // Count rooms based on the booking status
            switch (bookingStatus) {
                case 'Confirmed':
                    bookedRooms += booking.numRooms; // Count confirmed rooms as booked
                    break;
                case 'Cancelled':
                    cancelledRooms += booking.numRooms; // Count cancelled rooms
                    break;
                case 'Checked-in':
                    checkedInRooms += booking.numRooms; // Count checked-in rooms
                    break;
                case 'Checked-out':
                    checkedOutRooms += booking.numRooms; // Count checked-out rooms
                    break;
                case 'No-Show':
                    noShowRooms += booking.numRooms; // Count no-show rooms
                    break;
                case 'Failed':
                    failedRooms += booking.numRooms; // Count failed rooms
                    break;
                case 'Pending':
                    pendingRooms += booking.numRooms; // Count pending rooms
                    break;
                default:
                    break; // Unknown status, do nothing
            }
        }

        // Calculate available rooms

        // Send response
        return res.json({
            hotelId,
            hotelName: hotel.hotelName,
            totalRooms,
            bookedRooms,
            availableRooms,
            cancelledRooms,
            checkedInRooms,
            checkedOutRooms,
            noShowRooms,
            failedRooms,
            pendingRooms,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while checking availability.' });
    }
};
