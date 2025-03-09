const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the car schema
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
    images: {
        type: [String],
        default: []
    },
    year: {
        type: Number,
        required: true,
        max: new Date().getFullYear()
    },
    from: {
        type: String,
        trim: true
    },
    to: {
        type: String,
        trim: true
    },
    seater: {
        type: Number,
      
    },
    seatConfig: [
        {
            seatType: {
                type: String,
            },
            seatNumber: {
                type: Number,
              
            },
            isBooked: {
                type: Boolean,
            },
            seatPrice: {
                type: Number,
             
            },
            bookedBy: {
                type: String,
               
            }
        }
    ],
    extraKm: {
        type: Number,
        min: 0
    },
    perPersonCost: {
        type: Number,
    },
    availableFrom: {
        type: String,
    },
    availableTo: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    color: {
        type: String,
        required: true,
        trim: true
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


// Create and export the Car model
const Car = mongoose.model('Car', carSchema);

module.exports = Car;
