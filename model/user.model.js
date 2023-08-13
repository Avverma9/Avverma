const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    region: {
        type: [mongoose.Types.ObjectId]
    },
    photo: {
        type: String
    },
    mobile: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    company_name: {
        type: String,
        default: ''
    },
    company_address: {
        type: String,
        default: ''
    },
    DOB: {
        type: Date,
    },
    Pan: {
        type: String
    },
    PanNumber: {
        type: String
    },
    token: {
        type: String
    },
    isApprovedByAdmin: {
        type: Boolean,
        default: false
    },
    userPaymentId: {
        type: String,
        default: ''
    }

})


var userModel = mongoose.model('users', userSchema);
module.exports = userModel;