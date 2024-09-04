const mongoose = require("mongoose");

// Define the notification schema
const notificationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: Date,
      default: Date.now, // Sets default value to the current date and time
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the model from the schema
const Notification = mongoose.model("Notification", notificationSchema);

// Export the model
module.exports = Notification;
