const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { 
  createBooking, 
  getMyBookings, 
  getAllBookings, 
  cancelBooking, 
  updateBookingStatus 
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.get("/", getAllBookings); // Allow admin or public to see all bookings for now
router.patch("/:id/cancel", protect, cancelBooking);
router.patch("/:id/status", updateBookingStatus); // Allow admin to update status

module.exports = router;
