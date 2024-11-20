const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema(
    {
        city: { type: String },
        state: { type: String },
        place: { type: String },
        price: Number,
        duration: { type: Number }, // Duration in days for how much time of travel is being provided by the agent
        nights: { type: Number }, // Number of nights
        days: { type: Number }, // Number of days
        from: { type: Date }, // Start date of the travel
        to: { type: Date }, // End date of the travel
        amenities: [
            {
                name: { type: String },
                description: { type: String },
            },
        ],
        inclusion: { type: String },
        exclusion: { type: String },
        termsAndConditions: {
            type: Map,
            of: String,
        },
        dayWise: [
            {
                day: { type: Number },
                description: { type: String },
            },
        ],
        starRating: { type: Number, min: 1, max: 5 },
        images: [String],
    },
    { timestamps: true, strict: false }
);

const Travel = mongoose.model('Travel', travelSchema);
module.exports = Travel;
