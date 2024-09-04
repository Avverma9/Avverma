const Chat = require("../../models/messenger/chats");
const Message = require("../../models/messenger/messageModal");
exports.addToChat = async function (req, res) {
  try {
    const { chats } = req.body; // Extract the chats array from the request body

    if (!Array.isArray(chats) || chats.length === 0) {
      return res.status(400).json({ message: "Chats data is required." });
    }

    // Process each chat
    const results = await Promise.all(
      chats.map(async (chat) => {
        const { name, lastMessage, mobile, images, receiverId } = chat;

        if (!name || !mobile) {
          return {
            status: 400,
            message: "Name and mobile are required.",
            chat,
          };
        }

        const existingChat = await Chat.findOne({ mobile });

        if (existingChat) {
          // Update the existing chat
          existingChat.name = name;
          existingChat.lastMessage = lastMessage;
          existingChat.images = images || existingChat.images;
          existingChat.receiverId = receiverId;
          const updatedChat = await existingChat.save();

          return {
            status: 200,
            message: "Chat updated successfully",
            chat: updatedChat,
          };
        } else {
          // Create a new chat
          const newChat = await Chat.create({
            name,
            lastMessage,
            images,
            mobile,
            receiverId,
          });

          return {
            status: 201,
            message: "Chat created successfully",
            chat: newChat,
          };
        }
      })
    );

    // Send responses for each chat
    const successResponses = results.filter(
      (res) => res.status === 200 || res.status === 201
    );
    const errorResponses = results.filter(
      (res) => res.status !== 200 && res.status !== 201
    );

    return res.status(200).json({
      message: "Chats processed successfully",
      successResponses,
      errorResponses,
    });
  } catch (error) {
    console.error("Error adding to chat:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getChats = async function (req, res) {
  try {
    const chats = await Chat.find();

    return res.status(200).json(chats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteChatAndMessages = async function (req, res) {
  try {
    const { id, senderId, receiverId } = req.params;

    // Initialize flags for deletion status
    let chatDeleted = false;
    let messagesDeleted = false;

    // Validate that at least one of id, senderId, or receiverId is provided
    if (!id && (!senderId || !receiverId)) {
      return res.status(400).json({
        message: "Chat ID or both senderId and receiverId are required.",
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

    // If only id is provided, delete the chat
    if (id) {
      const deletedChat = await Chat.findByIdAndDelete(id);
      if (deletedChat) {
        chatDeleted = true;
      } else {
        return res.status(404).json({ message: "Chat not found." });
      }
    }

    // Determine the response based on what was deleted
    if (chatDeleted && messagesDeleted) {
      return res
        .status(200)
        .json({ message: "Chat and messages deleted successfully." });
    } else if (chatDeleted) {
      return res.status(200).json({ message: "Chat deleted successfully." });
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
