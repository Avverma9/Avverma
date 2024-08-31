const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const route = require("./routes/route");
const Message = require("./models/messenger/messageModal"); // Ensure this path is correct
const User = require("./models/dashBoardUserModel"); // Ensure you have a User model

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://Avverma:Avverma95766@avverma.2g4orpk.mongodb.net/Hotel";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust the origin as needed for security
    methods: ["GET", "POST"],
  },
});

// Socket.IO event handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle status updates
  socket.on("updateStatus", async (data) => {
    try {
      const { userId, online } = data;
      // Update the user's online status in the database
      await User.findByIdAndUpdate(userId, { online }, { new: true });
      // Broadcast status updates to all connected clients
      io.emit("statusUpdate", data);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  });

  // Handle sending messages
  socket.on("sendMessage", async (data) => {
    try {
      // Save the message to the database
      const message = new Message(data);
      await message.save();
      // Emit the new message to all connected clients
      io.emit("newMessage", message);
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Route handling
app.use("/", route);

// Catch-all route for incorrect endpoints
app.use((req, res) => {
  return res.status(404).send({ status: false, message: "Endpoint not found" });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
