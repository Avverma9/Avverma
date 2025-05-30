const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const webSocketHandler = require('./controllers/messenger/webSocket');
const setupRoutes = require('./controllers/messenger/messenger');
const routes = require('./routes/index');
const connectDB = require('./config/db');
const mailerRoutes = require('./nodemailer/routes')
// Create an Express application
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: ['http://localhost:3030', 'https://roomsstay.vercel.app'], // Your client origins
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/mail', mailerRoutes);

// Connect to the database
connectDB()
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Database connection error:', err));

// Set up WebSocket
webSocketHandler(io);

// Set up routes
app.use('/', routes);
app.use('/', setupRoutes(io));

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
    // Bind to 0.0.0.0 for Render
    console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
