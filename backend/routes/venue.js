const express = require("express");
const Venue = require("../models/venue");

const { getVenues, getVenueById, addVenue, syncVenues } = require("../controllers/venueController");

const router = express.Router();

router.get("/", getVenues);
router.post("/", addVenue);
router.post("/sync", syncVenues);
router.get("/:id", getVenueById);

module.exports = router;
