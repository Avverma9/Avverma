
const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", 
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "approved", "rejected"],
  },
  complaintDescription: {
    type: String,
    required: true
  },
});


module.exports= mongoose.model("complaint", complaintSchema);

