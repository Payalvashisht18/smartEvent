const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  name: String,
  location: String,
  price: Number,
  capacity: Number,
  type: String,
  image: String,
});

module.exports = mongoose.model("Venue", venueSchema);