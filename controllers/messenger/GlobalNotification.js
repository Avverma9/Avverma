const Notification = require("../../models/messenger/globalNotification");

exports.pushGlobalNotification = async function (req, res) {
  try {
    const { name, message, path } = req.body;
    if (!name || !message) {
      return res
        .status(400)
        .json({ message: "Name and message are required." });
    }

    const newNotification = new Notification({
      name,
      message,
      path,
    });

    await newNotification.save();
    res.status(201).json({ message: "Notification created successfully." });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getNotificationsForUser = async function (req, res) {
  const { userId } = req.params;

  try {
    // Fetch all notifications
    const notifications = await Notification.find();

    // Format notifications to include seen status for the user
    const formattedNotifications = notifications.map((notification) => ({
      ...notification.toObject(),
      seen: notification.seenBy.get(userId) || false,
    }));

    res.status(200).json(formattedNotifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateNotificationSeen = async function (req, res) {
  const { userId, notificationId } = req.params;

  try {
    // Update the notification to mark it as seen by the given userId
    await Notification.findByIdAndUpdate(
      notificationId,
      { $set: { [`seenBy.${userId}`]: true } },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Notification updated successfully." });
  } catch (error) {
    console.error("Error updating notification:", error);
    res.status(500).json({ message: "Server error" });
  }
};
