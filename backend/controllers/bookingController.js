const Booking = require("../models/Booking");
const Venue = require("../models/venue");
const User = require("../models/User");
const Notification = require("../models/Notification");
const { sendBookingEmail } = require("../utils/sendEmail");

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private (requires JWT)
const createBooking = async (req, res) => {
  try {
    const { venueId, date, guests, payment } = req.body;

    // Validation
    if (!venueId || !date || !payment) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // Check venue exists
    const venue = await Venue.findById(venueId);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    // Check for duplicate booking (same venue + same date)
    const existingBooking = await Booking.findOne({
      venue: venueId,
      date,
      status: { $ne: "cancelled" },
    });
    if (existingBooking) {
      return res.status(400).json({ message: "This venue is already booked on that date ❌" });
    }

    // Create booking
    const booking = await Booking.create({
      user: req.user._id,
      venue: venueId,
      date,
      guests: guests || 1,
      payment,
      totalAmount: venue.price,
      status: "pending",
    });

    // Populate venue details for response
    const populatedBooking = await Booking.findById(booking._id)
      .populate("venue", "name location price image")
      .populate("user", "name email");

    // Create in-app notification for User
    await Notification.create({
      user: req.user._id,
      title: "Booking Request Sent! ⏳",
      message: `Your booking request for "${venue.name}" on ${date} has been sent for approval. Total: ₹${(venue.price || 0).toLocaleString()}`,
      type: "booking_pending",
    });
 
    // Create notification for Admin
    const admin = await User.findOne({ role: "admin" });
    if (admin) {
      await Notification.create({
        user: admin._id,
        title: "New Booking Request 📢",
        message: `${req.user.name} has requested to book "${venue.name}" for ${date}.`,
        type: "admin_booking_alert",
        isAdminNotification: true,
        booking: booking._id,
      });
    }

    // Send confirmation email (non-blocking)
    sendBookingEmail({
      to: req.user.email,
      userName: req.user.name,
      venueName: venue.name,
      date,
      guests: guests || 1,
      totalAmount: venue.price,
      payment,
    }).catch((err) => console.error("Email error:", err));

    res.status(201).json({
      message: "Booking request sent! ⏳",
      booking: populatedBooking,
    });
  } catch (err) {
    console.error("Booking error:", err.message);
    res.status(500).json({ message: "Error creating booking", error: err.message });
  }
};

// @desc    Get bookings for logged-in user
// @route   GET /api/bookings/my
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("venue", "name location price image type")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings", error: err.message });
  }
};

// @desc    Get all bookings (admin)
// @route   GET /api/bookings
// @access  Public (for admin panel — add admin auth in production)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("venue", "name location price image")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings", error: err.message });
  }
};

// @desc    Cancel a booking
// @route   PATCH /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Verify ownership
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to cancel this booking" });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Booking is already cancelled" });
    }

    booking.status = "cancelled";
    await booking.save();

    // Create notification for cancellation
    const venue = await Venue.findById(booking.venue);
    await Notification.create({
      user: req.user._id,
      title: "Booking Cancelled",
      message: `Your booking for "${venue?.name || "Venue"}" on ${booking.date} has been cancelled.`,
      type: "booking_cancelled",
    });

    res.json({ message: "Booking cancelled successfully", booking });
  } catch (err) {
    res.status(500).json({ message: "Error cancelling booking", error: err.message });
  }
};

// @desc    Update a booking status (admin)
// @route   PATCH /api/bookings/:id/status
// @access  Private/Admin
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    
    // Create notification for the status update
    const venue = await Venue.findById(booking.venue).catch(() => null);
    await Notification.create({
      user: booking.user,
      title: `Booking ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      message: `Your booking for "${venue?.name || booking.venueName || "Venue"}" on ${new Date(booking.date).toLocaleDateString()} has been ${status}.`,
      type: `booking_${status}`,
    });

    res.json({ message: `Booking status updated to ${status}`, booking });
  } catch (err) {
    res.status(500).json({ message: "Failed to update booking status", error: err.message });
  }
};

module.exports = { createBooking, getMyBookings, getAllBookings, cancelBooking, updateBookingStatus };
