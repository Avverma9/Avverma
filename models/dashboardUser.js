const mongoose = require('mongoose');

const dashboardUser = new mongoose.Schema(
    {
        images: [String],
        name: String,
        mobile: {
            type: Number,
        },
        email: {
            type: String,
            unique: true,
        },
        role: {
            type: String,
            required: true,
            enum: ['Admin', 'PMS', 'Developer', 'CMS'],
        },
        menuItems: [String],
        address: String,
        isOnline: { type: Boolean, default: false }, // Track online status
        lastSeen: {
            type: Date,
            default: null,
        },
        password: String,
        status: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('dashBoardUser', dashboardUser);
