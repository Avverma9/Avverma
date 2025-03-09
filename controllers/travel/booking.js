const booking = require("../../models/travel/booking");
const Car = require("../../models/travel/cars");

const booking = require("../../models/travel/booking");
const Car = require("../../models/travel/cars");

exports.bookCar = async (req, res) => { 
    try {
        const { seatId, carId, bookedBy,...data } = req.body;

        // Find the car by ID
        const car = await Car.findById(carId);

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        // Find the specific seat in seatConfig to check if it's already booked
        const seatIndex = car.seatConfig.findIndex(seat => seat._id.toString() === seatId);

        if (seatIndex === -1) {
            return res.status(404).json({ message: 'Seat not found' });
        }

        const seat = car.seatConfig[seatIndex];

        if (seat.isBooked) {
            return res.status(400).json({ message: 'Seat is already booked' });
        }
        car.seatConfig[seatIndex].isBooked = true;
        await car.save();
        const newBooking = await booking.create({
            ...data,
            carId: car._id,
            seatId: seat._id,
            seatPrice: seat.seatPrice
        });

        return res.status(201).json({
            message: 'Successfully Booked',
            booking: newBooking,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
};
