const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    mobile: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    role: {
        type: Number,
        default: 1 //1.sub admin 0.admin
    },
    region: {
        type: [mongoose.Types.ObjectId]
    },
    status: {
        type: Number, // 1.active 0.not active
        default: 1
    },


})


var adminModel = mongoose.model('admins', adminSchema);
module.exports = adminModel;