const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    price: Number,
    capacity: Number,
    type: String,
    image: String,
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Venue", venueSchema);