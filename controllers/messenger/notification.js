const Notification = require("../../models//messenger/notification");

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
      isMain: true,
      path,
    });
    await newNotification.save();
    res.status(201).json({ message: "Notification created successfully." });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getNotification = async function (req, res) {
  const { userId } = req.params;

  try {
    // Fetch notifications for the user
    let notifications = await Notification.find({ userId });

    if (notifications.length > 0) {
      // Update notifications to mark as seen
      const updateResult = await Notification.updateMany(
        { userId, seen: false },
        { $set: { seen: true } } // Set seen to true
      );

      // Get the IDs of existing notifications
      const existingNotificationIds = notifications.map(
        (n) => n.notificationId
      );

      // Create a new notification with the same data if it doesn't already exist
      for (let notification of notifications) {
        const existingNotification = await Notification.findOne({
          userId,
          notificationId: notification.notificationId,
        });

        if (!existingNotification) {
          // Create a new notification entry with the same data but set as seen
          const newNotification = new Notification({
            name: notification.name,
            message: notification.message,
            time: notification.time,
            userId: notification.userId,
            path: notification.path,
            notificationId: notification._id,
            seen: true,
            isMain: false,
          });

          await newNotification.save();
        }
      }

      // Return notifications and update status
      return res.status(200).json({
        notifications,
        message:
          "Notifications fetched successfully. Notifications marked as seen and new notifications created where necessary.",
        updated:
          updateResult.modifiedCount > 0
            ? "Notifications marked as seen and new notifications created where necessary."
            : "No notifications updated.",
      });
    } else {
      // Fetch global notifications (those without userId)
      notifications = await Notification.find({ userId: { $exists: false } });

      if (notifications.length > 0) {
        // Create new notifications for the user based on global notifications
        for (let notification of notifications) {
          const existingNotification = await Notification.findOne({
            userId,
            notificationId: notification.notificationId,
          });

          if (!existingNotification) {
            const newNotification = new Notification({
              name: notification.name,
              message: notification.message,
              path: notification.path,
              time: notification.time,
              userId,
              seen: true, // Mark as seen since it's a placeholder message
              isMain: false,
            });

            await newNotification.save();
          }
        }

        // Return the global notifications
        return res.status(200).json({
          notifications,
          message:
            "No notifications for the user. Global notifications have been created for the user.",
        });
      } else {
        // No notifications found, create a placeholder notification
        const placeholderNotification = new Notification({
          userId,
          name: "No Notifications",
          message: "You have no new notifications.",
          seen: true, // Mark as seen
          isMain: false,
        });

        await placeholderNotification.save();

        // Return the placeholder notification
        return res.status(200).json({
          notifications: [placeholderNotification],
          message:
            "No new notifications found. A placeholder notification has been created.",
        });
      }
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAll = async function (req, res) {
  const getAllNotification = await Notification.find();
  filteredData = getAllNotification.filter((item) => item.isMain !== true);
  res.json(filteredData);
};
