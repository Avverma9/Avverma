const TravelBooking = require("../../models/travel/booking");
const Car = require("../../models/travel/cars");

exports.bookCar = async (req, res) => {
    try {
        const { seatId, carId, bookedBy, customerMobile } = req.body;
       
        const car = await Car.findById(carId);
        const seat = car.seatConfig.find(seat => seat._id.toString() === seatId);

        if (!seat) return res.status(404).json({ message: 'Seat not found' });
        if (seat.isBooked) return res.status(400).json({ message: 'Seat is already booked' });
        const totalSeatPrice = seat.seatPrice 
        seat.isBooked = true;
        seat.bookedBy = bookedBy;
        await car.save();

        const newBooking = await TravelBooking.create({
            carId: car._id,
            seatId: seat._id,
            seatNumber: seat.seatNumber,
            seatPrice: totalSeatPrice,
            bookedBy,
            customerMobile,
            pickupP: car.pickupP,
            dropP: car.dropP,
            pickupD: car.pickupD,
            dropD: car.dropD,
            vehicleNumber: car.carNumber,
            seatType: seat.seatType,
            bookingDate: new Date(),
        });

        return res.status(201).json({
            message: 'Successfully Booked',
            booking: newBooking,
            gstDetails: {
                gstRate: `${GST_RATE * 100}%`,
                gstAmount,
                totalSeatPrice,
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