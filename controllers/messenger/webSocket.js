const WebSocket = require("ws");
const UserStatus = require("../../models/messenger/userStatus"); // Ensure this is the correct path

const wss = new WebSocket.Server({ port: 8080 });
const userConnections = new Map(); // userId -> WebSocket connection

wss.on("connection", (ws) => {
  let userId;

  ws.on("message", async (message) => {
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.type === "connect") {
      userId = parsedMessage.userId;
      userConnections.set(userId, ws);

      // Update user status in the database
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

        // Update user status in the database
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

      // Update user status in the database
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

console.log("WebSocket server is running on ws://localhost:8080");
