const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
      required: false,
    },
    venueName: {
      type: String,
      default: "Hall / Venue",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    customerName: {
      type: String,
      default: "Guest User",
    },
    customerEmail: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      required: true,
    },
    payment: {
      type: String,
      enum: ["card", "upi", "cash", "online", "other"],
      default: "cash",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
