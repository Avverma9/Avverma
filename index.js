const express = require("express");
const { createServer } = require("http");
const WebSocket = require("ws");
const bodyParser = require("body-parser");
const cors = require("cors");
//Router===================================
// const bookingRouter = require("./routes/booking/booking");
// const dashboardRouter = require("./routes/dashboardUser/dashboardUser");
// const UserStatus = require("./models/messenger/userStatus");
// const hotelRouter = require("./routes/hotel/hotel");
// const reviewRouter = require("./routes/review");
// const userRouter = require("./routes/user");
const routes = require("./routes/index")
const connectDB = require("./config/db"); // Import the DB
//=================================================================
const app = express();
const server = createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

// Track WebSocket connections
const userConnections = new Map();

// WebSocket Server Logic
wss.on("connection", (ws) => {
  let userId;

  ws.on("message", async (message) => {
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.type === "connect") {
      userId = parsedMessage.userId;
      userConnections.set(userId, ws);

      // Update user status to online in the database
      await UserStatus.findOneAndUpdate(
        { user: userId },
        { online: true, lastSeen: undefined },
        { upsert: true, new: true }
      );
      console.log(`User ${userId} connected`);
    }

    if (parsedMessage.type === "disconnect") {
      if (userId) {
        userConnections.delete(userId);

        // Update user status to offline in the database
        await UserStatus.findOneAndUpdate(
          { user: userId },
          { online: false, lastSeen: Date.now() },
          { upsert: true, new: true }
        );
        console.log(`User ${userId} disconnected`);
      }
    }
  });

  ws.on("close", async () => {
    if (userId) {
      userConnections.delete(userId);

      // Update user status to offline in the database
      await UserStatus.findOneAndUpdate(
        { user: userId },
        { online: false, lastSeen: Date.now() },
        { upsert: true, new: true }
      );
      console.log(`User ${userId} disconnected`);
    }
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

// API Endpoint to Get User Status
app.get("/update-status-of-a-user/messenger/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const userStatus = await UserStatus.findOne({ user: userId });

    if (!userStatus) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userStatus);
  } catch (error) {
    console.error("Error fetching user status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Connect to MongoDB
connectDB(); // Use the new function

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
