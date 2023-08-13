const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    to: {
      type: mongoose.Types.ObjectId,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default:''
    },
    body: {
      type: String,
      default: ''
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true // Add timestamps option to enable createdAt and updatedAt fields
  }
);

const notificationModel = mongoose.model('notifications', notificationSchema);
module.exports = notificationModel;
