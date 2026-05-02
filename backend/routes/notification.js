const express = require("express");
const Notification = require("../models/Notification");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find().populate("booking").sort({ createdAt: -1 });
    return res.json(notifications);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch notifications", error: error.message });
  }
});

router.patch("/:id/read", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!notification) return res.status(404).json({ message: "Notification not found" });
    return res.json({ message: "Notification marked as read ✅", notification });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update notification", error: error.message });
  }
});

module.exports = router;
