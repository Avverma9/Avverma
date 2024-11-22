const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema(
    {
        travelAgencyName: String,
        country: { type: String },
        state: { type: String },
        city: { type: String },
        visitngPlaces: { type: String },
        price: Number,
        nights: { type: Number }, // Number of nights
        days: { type: Number }, // Number of days
        from: { type: Date }, // Start date of the travel
        to: { type: Date }, // End date of the travel
        amenities: [String],
        inclusion: [String],
        exclusion: [String],
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
