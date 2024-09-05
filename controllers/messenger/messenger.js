const Message = require("../../models/messenger/messageModal");
const UserStatus = require("../../models/messenger/userStatus");
const user = require("../../models/dashBoardUserModel")
exports.getContacts = async function (req, res) {
  try {
    // Fetch the data from the database
    const getData = await user.find({}, "name images mobile role"); // Only fetch the 'name' and 'images' fields

    // If data is successfully fetched, send the filtered data as a response
    if (getData) {
      // Send the response with the filtered data
      res.status(200).json(getData);
    } else {
      // If no data is found, send an appropriate response
      res.status(404).json({ message: "No data found" });
    }
  } catch (error) {
    // Handle any potential errors during the database operation
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  const { senderId, receiverId, content } = req.body;

  try {
    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      content,
    });
    await message.save();

    await UserStatus.findOneAndUpdate(
      { user: receiverId },
      { lastSeen: Date.now() },
      { upsert: true }
    );

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.getMessages = async (req, res) => {
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
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.markAsSeen = async (req, res) => {
  const { messageId, receiverId } = req.body;


  try {
    // Find the message by ID and check if the receiver matches
    const message = await Message.findOne({
      _id: messageId,
      receiver: receiverId,
    }).exec(); // Ensure the query is executed

    if (message) {

      // Update the message's 'seen' status to true
      message.seen = true;
      const updatedMessage = await message.save(); // Save the updated message


      res.json(updatedMessage);
    } else {
      res
        .status(404)
        .json({ message: "Message not found or receiver does not match" });
    }
  } catch (err) {
    console.error("Server error:", err); // Error log
    res.status(500).json({ message: "Server error", error: err });
  }
};


exports.deleteChatAndMessages = async function (req, res) {
  try {
    const { senderId, receiverId } = req.params;

    let messagesDeleted = false;

    // Validate that at least one of id, senderId, or receiverId is provided
    if (!senderId || !receiverId) {
      return res.status(400).json({
        message: "senderId and receiverId are required.",
      });
    }

    // If senderId and receiverId are provided, delete the messages between them
    if (senderId && receiverId) {
      const result = await Message.deleteMany({
        sender: senderId,
        receiver: receiverId,
      });

      if (result.deletedCount > 0) {
        messagesDeleted = true;
      } else {
        // No messages found for the given senderId and receiverId
        return res.status(404).json({
          message: "No messages found for the given sender and receiver IDs.",
        });
      }
    }

    //

    // Determine the response based on what was deleted
    if (messagesDeleted) {
      return res
        .status(200)
        .json({ message: "Chat and messages deleted successfully." });
    } else if (messagesDeleted) {
      return res
        .status(200)
        .json({ message: "Messages deleted successfully." });
    } else {
      return res
        .status(400)
        .json({ message: "No valid parameters provided to delete." });
    }
  } catch (error) {
    console.error("Error deleting chat and messages:", error);
    return res.status(500).json({ message: "Server error" });
  }
};