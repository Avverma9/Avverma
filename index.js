const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const route = require("./routes/route");
const Message = require("./models/messenger/messageModal"); // Make sure you have a Message model

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  "mongodb+srv://Avverma:Avverma95766@avverma.2g4orpk.mongodb.net/Hotel";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust the origin as needed
    methods: ["GET", "POST"],
  },
});

// Socket.io event handling
io.on("connection", (socket) => {
  console.log("A user connected");

  // Update status event
  socket.on("updateStatus", (data) => {
    // Broadcast status updates to all connected clients
    io.emit("statusUpdate", data);
  });

  // Send message event
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
    console.log("User disconnected");
  });
});

// Route handling
app.use("/", route);

app.use((req, res) => {
  return res
    .status(400)
    .send({ status: false, message: "End point is incorrect" });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
