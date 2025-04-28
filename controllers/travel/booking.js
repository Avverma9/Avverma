const TravelBooking = require("../../models/travel/booking");
const Car = require("../../models/travel/cars");

exports.bookCar = async (req, res) => {
    try {
        const { seatId, carId, bookedBy, customerMobile  } = req.body;
        const GST_RATE = 0.18; // 18% GST
        const GST_THRESHOLD = 1000; // Hypothetical GST rule threshold
        const car = await Car.findById(carId);
        const seatIndex = car.seatConfig.findIndex(seat => seat._id.toString() === seatId);
        if (seatIndex === -1) {
            return res.status(404).json({ message: 'Seat not found' });
        }

        const seat = car.seatConfig[seatIndex];
        if (seat.isBooked) {
            return res.status(400).json({ message: 'Seat is already booked' });
        }

        // Calculate GST on seat price
        const gstAmount = seat.seatPrice * GST_RATE;
        const totalSeatPrice = seat.seatPrice + gstAmount;

        // Mark seat as booked and assign bookedBy
        car.seatConfig[seatIndex].isBooked = true;
        car.seatConfig[seatIndex].bookedBy = bookedBy;
        await car.save();
        const newBooking = await TravelBooking.create({
            carId: car._id,
            seatId: seat._id,
            seatNumber: seat.seatNumber,
            seatPrice: totalSeatPrice, // Seat price including GST
            bookedBy: bookedBy, // Storing bookedBy in booking data as well
            customerMobile: customerMobile,
            seatType: seat.seatType,
            bookingDate: new Date()
        });

        return res.status(201).json({
            message: 'Successfully Booked',
            booking: newBooking,
            gstDetails: {
                gstRate: `${GST_RATE * 100}%`,
                gstAmount: gstAmount,
                totalSeatPrice: totalSeatPrice,
                gstRule: `GST is applicable at ${GST_RATE * 100}% if the price exceeds ₹${GST_THRESHOLD}.`
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
};


exports.getTravelBookings = async (req, res) => {
    try {
        const findBookings = await TravelBooking.find()
        res.status(200).json(findBookings)
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
}