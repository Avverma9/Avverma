const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the booking schema
const bookingSchema = new Schema({
    carId: {
        type: Schema.Types.ObjectId,
        ref: "Car",
        required: true,
      },
  seatId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  seatNumber: {
    type: Number,
    required: true,
  },
  seatPrice: {
    type: Number,
    required: true,
  },

  bookedBy: {
    type: String, // Could be user ID or name
  },
  seatType: {
    type: String,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
 
});

// Create a method to update the car's seat status
bookingSchema.methods.updateCarSeatStatus = async function () {
  const car = await mongoose.model("Car").findById(this.carId);

  if (!car) {
    throw new Error("Car not found");
  }

  const seat = car.seatConfig.find(
    (seat) => seat.seatNumber === this.seatNumber,
  );

  if (!seat) {
    throw new Error("Seat not found in the car configuration");
  }

  seat.isBooked = true;

  // Save the car document with the updated seat status
  await car.save();
};

// Create and export the Booking model
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
