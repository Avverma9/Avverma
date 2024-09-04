const Chat = require("../../models/messenger/chats");

exports.addToChat = async function (req, res) {
  try {
    const { chats } = req.body; // Extract the chats array from the request body

    if (!Array.isArray(chats) || chats.length === 0) {
      return res.status(400).json({ message: "Chats data is required." });
    }

    // Process each chat
    const results = await Promise.all(
      chats.map(async (chat) => {
        const { name, lastMessage, mobile, images } = chat;

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

exports.deleteChatsById = async function (req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Chat ID is required." });
    }

    const deletedChat = await Chat.findByIdAndDelete(id);

    if (!deletedChat) {
      return res.status(404).json({ message: "Chat not found." });
    }

    return res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error("Error deleting chat:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
