const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const webSocketHandler = require('./controllers/messenger/webSocket');
const setupRoutes = require('./controllers/messenger/messenger');
const routes = require('./routes/index');
const connectDB = require('./config/db'); // Import the DB

// Create an Express application
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3030', // Your client origin
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Set up WebSocket
webSocketHandler(io);

// Set up routes
app.use('/', routes);
app.use('/', setupRoutes(io));

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
