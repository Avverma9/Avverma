const mongoose = require("mongoose");

// Define the notification schema
const notificationSchema = new mongoose.Schema(
  {
    name: String,
    path: String,
    message: String,
    seen: Boolean,
    isMain: Boolean,
    time: {
      type: Date,
      default: Date.now, // Sets default value to the current date and time
    },
    notificationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification", // Refers to the DashboardUser model
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DashboardUser", // Refers to the DashboardUser model
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
