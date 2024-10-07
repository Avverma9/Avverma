const express = require('express');
const Message = require('../../models/messenger/message');
const User = require('../../models/dashboardUser');

const setupRoutes = (io) => {
    const router = express.Router();

    // Get contacts
    router.get('/get-chat/contacts', async (req, res) => {
        try {
            const contacts = await User.find();
            if (contacts.length > 0) {
                res.status(200).json(contacts);
            } else {
                res.status(404).json({ message: 'No contacts found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching contacts', error: error.message });
        }
    });

    // Send message
    router.post('/send-a-message/messenger', async (req, res) => {
        const { senderId, receiverId, content } = req.body;
        const newMessage = new Message({
            sender: senderId,
            receiver: receiverId,
            content,
        });
        try {
            await newMessage.save();
            io.emit('newMessage', newMessage);
            res.status(200).json(newMessage);
        } catch (err) {
            res.status(500).json({ message: 'Server error', error: err });
        }
    });

    // Get messages between two users
    router.get('/get-messages/of-chat/:userId1/:userId2', async (req, res) => {
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
            res.status(500).json({ message: 'Server error', error: err });
        }
    });

    // Mark message as seen
    router.post('/mark-as-seen', async (req, res) => {
        const { messageId, receiverId } = req.body;
        try {
            const message = await Message.findOne({ _id: messageId, receiver: receiverId }).exec();
            if (message) {
                message.seen = true;
                const updatedMessage = await message.save();
                res.json(updatedMessage);
            } else {
                res.status(404).json({ message: 'Message not found or receiver does not match' });
            }
        } catch (err) {
            console.error('Server error:', err);
            res.status(500).json({ message: 'Server error', error: err });
        }
    });

    // Delete chat and messages
    router.delete('/chat/:senderId/:receiverId', async (req, res) => {
        try {
            const { senderId, receiverId } = req.params;
            const result = await Message.deleteMany({
                $or: [
                    { sender: senderId, receiver: receiverId },
                    { sender: receiverId, receiver: senderId },
                ],
            });
            return res.status(200).json({ message: 'Successfully deleted', result });
        } catch (error) {
            console.error('Error deleting chat and messages:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    });

    return router;
};

module.exports = setupRoutes;
