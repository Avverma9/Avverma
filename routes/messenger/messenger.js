const express = require("express");
const router = express.Router();
const messenger = require("../../controllers/messenger/messenger")

router.post("/send-a-message/messenger", messenger.sendMessage); //panel
// router.get("/get-messages/of-chat/:userId1/:userId2", messenger.getMessages); //panel
router.put("/mark-as-seen/messages", messenger.markAsSeen); // panel
router.get("/get-chat/contacts", messenger.getContacts); // panel
router.delete(
  "/delete/added/chats/from/messenger-app/:senderId/:receiverId?",
  messenger.deleteChatAndMessages
); //panel
module.exports = router;
