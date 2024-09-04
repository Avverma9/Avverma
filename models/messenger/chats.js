const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema(
  {
    images: {
      type: [String],
    },
    name: {
      type: String,
      
    },
    mobile: {
      type: Number,
  
    },
    lastMessage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);


const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
