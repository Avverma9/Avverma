const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        travelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Travel',
            required: true, // Reference to the travel package being booked
        },
        customerName: {
            type: String,
            required: true, // Name of the person booking
        },
        customerEmail: {
            type: String,
            required: true, // Email for communication
        },
        customerPhone: {
            type: String,
            required: true, // Phone number of the customer
        },
        bookingDate: {
            type: Date,
            default: Date.now, // Date when the booking was made
        },
        travelDates: {
            from: { type: Date, required: true }, // Start date of the travel
            to: { type: Date, required: true },   // End date of the travel
        },
        totalPrice: {
            type: Number,
            required: true, // Total cost for the booking
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'canceled', 'completed'],
            default: 'pending', // Booking status
        },
        numberOfPeople: {
            type: Number,
            required: true, // Number of people in the booking
        },
        specialRequests: {
            type: String, // Any special requests the customer might have
        },
        paymentStatus: {
            type: String,
            enum: ['not_paid', 'paid', 'refunded'],
            default: 'not_paid', // Payment status of the booking
        },
    },
    { timestamps: true }
);

// Model for Booking
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
