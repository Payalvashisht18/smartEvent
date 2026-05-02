const Venue = require("../models/venue");

// @desc    Get all venues
// @route   GET /api/venues
// @access  Public
const getVenues = async (req, res) => {
  try {
    const { location, type, budget, capacity, minPrice, maxPrice, minCapacity, maxCapacity } = req.query;

    // Build dynamic filter
    const filter = {};

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }
    if (type) {
      filter.type = { $regex: type, $options: "i" };
    }

    // Price/Budget filtering
    if (budget || minPrice || maxPrice) {
      filter.price = {};
      if (budget) filter.price.$lte = Number(budget);
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Capacity filtering
    if (capacity || minCapacity || maxCapacity) {
      filter.capacity = {};
      if (capacity) filter.capacity.$gte = Number(capacity);
      if (minCapacity) filter.capacity.$gte = Number(minCapacity);
      if (maxCapacity) filter.capacity.$lte = Number(maxCapacity);
    }

    const venues = await Venue.find(filter).sort({ createdAt: -1 });
    res.json(venues);
  } catch (err) {
    res.status(500).json({ message: "Error fetching venues", error: err.message });
  }
};

// @desc    Get single venue by ID
// @route   GET /api/venues/:id
// @access  Public
const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }
    res.json(venue);
  } catch (err) {
    res.status(500).json({ message: "Error fetching venue", error: err.message });
  }
};

// @desc    Add a new venue
// @route   POST /api/venues
// @access  Public (could be admin-only in production)
const addVenue = async (req, res) => {
  try {
    const { name, location, price, capacity, type, image, description } = req.body;

    if (!name || !location || !price || !capacity || !type) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const venue = await Venue.create({
      name,
      location,
      price,
      capacity,
      type,
      image: image || undefined,
      description: description || "",
    });

    res.status(201).json({ message: "Venue added ✅", venue });
  } catch (err) {
    res.status(500).json({ message: "Error adding venue", error: err.message });
  }
};

const { fetchVenuesFromExternalAPI } = require("../utils/externalVenueService");
 
// @desc    Sync venues from external API
// @route   POST /api/venues/sync
// @access  Public (should be Admin only)
const syncVenues = async (req, res) => {
  try {
    const externalData = await fetchVenuesFromExternalAPI();
    
    // Save to database (avoid duplicates by name for this example)
    const savedVenues = [];
    for (const data of externalData) {
      const exists = await Venue.findOne({ name: data.name });
      if (!exists) {
        const newVenue = await Venue.create(data);
        savedVenues.push(newVenue);
      }
    }
 
    res.status(200).json({
      message: `Sync complete. Added ${savedVenues.length} new venues.`,
      venues: savedVenues,
    });
  } catch (err) {
    res.status(500).json({ message: "Sync failed", error: err.message });
  }
};
 
module.exports = { getVenues, getVenueById, addVenue, syncVenues };
