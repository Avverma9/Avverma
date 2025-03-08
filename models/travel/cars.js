const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    make: {
        type: String,
        required: true,
        trim: true,
    },
    model: {
        type: String,
        required: true,
        trim: true,
    },
    images: [String],
    year: {
        type: Number,
        required: true,
        min: 1886,
        max: new Date().getFullYear(),
    },
    from:String,
    to:String,
    seater: Number,
    extraKm: Number,
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    color: {
        type: String,
        required: true,
        trim: true,
    },
    mileage: {
        type: Number,
        min: 0,
        default: 0,
    },
    fuelType: {
        type: String,
        enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
        required: true,
    },
    transmission: {
        type: String,
        enum: ['Automatic', 'Manual'],
        required: true,
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'carOwner',
    },

    dateAdded: {
        type: Date,
        default: Date.now,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
