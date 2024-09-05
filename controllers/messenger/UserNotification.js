const Notification = require("../../models/messenger/UserNotification");

exports.pushUserNotification = async(req,res)=>{
  const { name, message, userIds, path } = req.body;

  if (!Array.isArray(userIds) || userIds.length === 0) {
    return res.status(400).json({ message: "User IDs are required" });
  }

  try {
    const seenBy = {};
    userIds.forEach((userId) => {
      seenBy[userId] = false;
    });

    const newNotification = new Notification({
      name,
      message,
      userIds,
      path,
      seenBy,
    });

    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getNotificationByUser = async function (req, res) {
 const { userId } = req.params;

 try {
   const notifications = await Notification.find({
     userIds: userId,
   }).lean(); // Use lean() to get plain JavaScript objects

   // Process notifications to determine if they are unread
   notifications.forEach((notification) => {
     notification.isUnRead = !notification.seenBy[userId];
   });

   res.json(notifications);
 } catch (error) {
   res.status(500).json({ message: error.message });
 }
};

exports.updateUserNotificationSeen = async function (req, res) {
  const { notificationId } = req.params;
  const { userId } = req.body;

  try {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (notification.userIds.includes(userId)) {
      notification.seenBy.set(userId, true); // Mark as seen
      await notification.save();
      res.status(200).json(notification);
    } else {
      res
        .status(403)
        .json({ message: "User not associated with this notification" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


