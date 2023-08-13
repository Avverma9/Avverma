const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    region: {
        type: mongoose.Schema.Types.ObjectId,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
    },
    productName: {
        type: String,
    },
    registrationNumber: {
        type: String,
    },
    agreementNumber: {
        type: String,
    },
    rc: {
        type: Boolean,
    },
    rc_name: {
        type: String,
    },
    startPrice: {
        type: Number,
    },
    startPricePercent: {
        type: Number,
        default: 100
    },
    reservePrice: {
        type: Number,
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    parkingName: {
        type: String
    },
    parkingAddress: {
        type: String
    },
    yearOfManufacture: {
        type: String
    },
    paymentTerm: {
        type: String,
    },
    quotationValidity: {
        type: Date,
    },
    auctionFees: {
        type: Number,
    },
    auctionTerm: {
        type: String,
    },
    otherInformation: {
        type: String,
    },
    photoVideo: {
        type: String,
    },
    valuationFile: {
        type: String,
    }
});

const AuctionModel = mongoose.model('Auction', auctionSchema);

module.exports = AuctionModel;
