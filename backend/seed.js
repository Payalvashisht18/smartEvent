/**
 * Seed script — populates MongoDB with sample venues
 * Run: node seed.js
 */
require("dotenv").config();
const mongoose = require("mongoose");
const Venue = require("./models/venue");

const venues = [
  {
    name: "Royal Palace Ballroom",
    location: "Delhi, Sector 62",
    price: 30000,
    capacity: 300,
    type: "Marriage Hall",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
    description: "A grand wedding palace with royal architecture and lush gardens.",
  },
  {
    name: "Starlight Birthday Hall",
    location: "Noida, Sector 18",
    price: 15000,
    capacity: 150,
    type: "Birthday Party",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
    description: "Colorful and vibrant hall perfect for birthday celebrations.",
  },
  {
    name: "Green Valley Party Lawn",
    location: "Gurgaon, Phase 5",
    price: 50000,
    capacity: 600,
    type: "Outdoor Event",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
    description: "Spacious open-air lawn for large parties and gatherings.",
  },
  {
    name: "Tech Hub Conference Center",
    location: "Bangalore, Whitefield",
    price: 45000,
    capacity: 400,
    type: "Conference",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800",
    description: "High-tech venue with 4K projectors and high-speed Wi-Fi.",
  },
  {
    name: "Ocean View Resort",
    location: "Goa, Calangute",
    price: 85000,
    capacity: 1000,
    type: "Beach Wedding",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    description: "Premium beachside resort with panoramic ocean views.",
  },
  {
    name: "Intimate Garden Cafe",
    location: "Pune, Koregaon Park",
    price: 8000,
    capacity: 50,
    type: "Small Gathering",
    image: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800",
    description: "Cozy garden cafe for small meetups and kitty parties.",
  },
  {
    name: "Sky High Rooftop Lounge",
    location: "Mumbai, Bandra",
    price: 35000,
    capacity: 120,
    type: "Cocktail Party",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    description: "Luxurious rooftop lounge with a stunning view of the skyline.",
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing venues
    await Venue.deleteMany({});
    console.log("🗑️  Cleared existing venues");

    // Insert seed data
    const inserted = await Venue.insertMany(venues);
    console.log(`🌱 Seeded ${inserted.length} venues successfully!`);

    inserted.forEach((v) => {
      console.log(`   → ${v.name} (${v.location}) — ₹${v.price.toLocaleString()}`);
    });

    await mongoose.connection.close();
    console.log("\n✅ Done. Database connection closed.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
};

seedDB();
