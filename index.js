const express = require('express');
const { createServer } = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const cors = require('cors');
const UserStatus = require('./models/messenger/userStatus'); // Adjust path as needed

const routes = require('./routes/index');
const connectDB = require('./config/db'); // Import the DB
//=================================================================
const app = express();
const server = createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

// Track WebSocket connections
const userConnections = new Map();

// WebSocket Server Logic
wss.on('connection', (ws) => {
    let userId;

    ws.on('message', async (message) => {
        const parsedMessage = JSON.parse(message);

        if (parsedMessage.type === 'connect') {
            userId = parsedMessage.userId;
            userConnections.set(userId, ws);

            // Update user status to online in the database
            await UserStatus.findOneAndUpdate({ user: userId }, { online: true, lastSeen: undefined }, { upsert: true, new: true });
            console.log(`User ${userId} connected`);
        }

        if (parsedMessage.type === 'disconnect') {
            if (userId) {
                userConnections.delete(userId);

                // Update user status to offline in the database
                await UserStatus.findOneAndUpdate({ user: userId }, { online: false, lastSeen: Date.now() }, { upsert: true, new: true });
                console.log(`User ${userId} disconnected`);
            }
        }
    });

    ws.on('close', async () => {
        if (userId) {
            userConnections.delete(userId);

            // Update user status to offline in the database
            await UserStatus.findOneAndUpdate({ user: userId }, { online: false, lastSeen: Date.now() }, { upsert: true, new: true });
            console.log(`User ${userId} disconnected`);
        }
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

// API Endpoint to Get User Status
app.get('/update-status-of-a-user/messenger/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const userStatus = await UserStatus.findOne({ user: userId });

        if (!userStatus) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(userStatus);
    } catch (error) {
        console.error('Error fetching user status:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.get('/get-messages/of-chat/:userId1/:userId2', async (req, res) => {
    const { userId1, userId2 } = req.params;

    try {
        const messages = await Message.find({
            $or: [
                { sender: userId1, receiver: userId2 },
                { sender: userId2, receiver: userId1 },
            ],
        }).sort({ timestamp: 1 });

        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Connect to MongoDB
connectDB(); // Use the new function

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
