const mongoose =  require("mongoose")

const couponSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    code :{
        type: String,
        required: true,
        unique: true,
    },
    discount:{
        type: Number,
        required: true,
    },
    validity:{
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Coupon', couponSchema)