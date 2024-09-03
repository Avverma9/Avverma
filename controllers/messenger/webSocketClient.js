const WebSocket = require("ws");

// Use an environment variable or default URL
const serverUrl = process.env.WS_SERVER_URL || "ws://localhost:8080";

const ws = new WebSocket(serverUrl);

const userId = "someUserId"; // Replace with actual user ID

ws.on("open", () => {
  console.log("Connected to WebSocket server");

  // Notify server of connection with userId
  ws.send(JSON.stringify({ type: "connect", userId }));
});

ws.on("message", (data) => {
  try {
    const message = JSON.parse(data);
    console.log("Received message:", message);
  } catch (err) {
    console.error("Error parsing message:", err);
  }
});

ws.on("close", () => {
  console.log("Disconnected from WebSocket server");
});

ws.on("error", (error) => {
  console.error("WebSocket error:", error);
});
