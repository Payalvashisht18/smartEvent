/**
 * Seed script — populates MongoDB with sample venues
 * Run: node seed.js
 */
require("dotenv").config();
const mongoose = require("mongoose");
const Venue = require("./models/venue");

const venues = [
  // ── WEDDINGS ──
  {
    name: "Royal Palace Ballroom",
    location: "Delhi, Sector 62",
    price: 120000,
    capacity: 500,
    type: "Wedding",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
    description: "A grand wedding palace with royal architecture, lush gardens, and world-class catering.",
  },
  {
    name: "Ocean View Beach Resort",
    location: "Goa, Calangute",
    price: 180000,
    capacity: 800,
    type: "Wedding",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    description: "Premium beachside resort with panoramic ocean views perfect for destination weddings.",
  },
  {
    name: "The Grand Mahal",
    location: "Jaipur, MI Road",
    price: 200000,
    capacity: 1000,
    type: "Wedding",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
    description: "Palatial heritage venue with Rajasthani decor, fountains, and sprawling lawns.",
  },
  {
    name: "Lakeside Wedding Pavilion",
    location: "Udaipur, Pichola Lake",
    price: 250000,
    capacity: 600,
    type: "Wedding",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800",
    description: "Iconic lake-facing pavilion with boat entry options and stunning sunset views.",
  },
  {
    name: "Silver Oak Garden Venue",
    location: "Pune, Koregaon Park",
    price: 75000,
    capacity: 400,
    type: "Wedding",
    image: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800",
    description: "Lush green garden with fairy lights, open sky, and flexible décor options.",
  },

  // ── BIRTHDAY ──
  {
    name: "Starlight Birthday Hall",
    location: "Noida, Sector 18",
    price: 15000,
    capacity: 150,
    type: "Birthday",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
    description: "Colorful and vibrant hall perfect for kids' and adult birthday celebrations.",
  },
  {
    name: "Neon Party Studio",
    location: "Mumbai, Andheri West",
    price: 25000,
    capacity: 100,
    type: "Birthday",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    description: "Trendy neon-lit studio with DJ setup, photo booth, and glow-in-dark décor.",
  },
  {
    name: "Rainbow Celebration Hall",
    location: "Hyderabad, Banjara Hills",
    price: 18000,
    capacity: 200,
    type: "Birthday",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
    description: "Bright and cheerful hall with full event management and catering services.",
  },

  // ── CONFERENCE ──
  {
    name: "Tech Hub Conference Center",
    location: "Bangalore, Whitefield",
    price: 45000,
    capacity: 400,
    type: "Conference",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800",
    description: "High-tech venue with 4K projectors, high-speed Wi-Fi, and modular seating.",
  },
  {
    name: "Business Elite Suites",
    location: "Chennai, Anna Nagar",
    price: 30000,
    capacity: 200,
    type: "Conference",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    description: "Professional conference rooms with AV equipment, breakout zones, and catering.",
  },
  {
    name: "Innovation Summit Hall",
    location: "Delhi, Connaught Place",
    price: 60000,
    capacity: 600,
    type: "Conference",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    description: "Spacious auditorium-style hall for large corporate summits and product launches.",
  },

  // ── PARTY ──
  {
    name: "Sky High Rooftop Lounge",
    location: "Mumbai, Bandra",
    price: 35000,
    capacity: 120,
    type: "Party",
    image: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=800",
    description: "Luxurious rooftop lounge with a stunning cityscape view and premium bar service.",
  },
  {
    name: "Green Valley Party Lawn",
    location: "Gurgaon, Phase 5",
    price: 50000,
    capacity: 600,
    type: "Party",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800",
    description: "Spacious open-air lawn for large parties, concerts, and corporate gatherings.",
  },
  {
    name: "Club Infinity",
    location: "Kolkata, Park Street",
    price: 40000,
    capacity: 300,
    type: "Party",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
    description: "Premium nightlife venue with DJ, dance floor, and full bar arrangements.",
  },

  // ── OUTDOOR EVENT ──
  {
    name: "Meadow Fest Grounds",
    location: "Shimla, Mall Road",
    price: 55000,
    capacity: 700,
    type: "Outdoor Event",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800",
    description: "Scenic mountain meadow perfect for music festivals, fairs, and cultural events.",
  },
  {
    name: "Riverside Amphitheatre",
    location: "Rishikesh, Laxman Jhula",
    price: 40000,
    capacity: 500,
    type: "Outdoor Event",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
    description: "Dramatic open-air amphitheatre beside the Ganges for cultural shows and events.",
  },

  // ── SMALL GATHERING ──
  {
    name: "Intimate Garden Cafe",
    location: "Pune, Koregaon Park",
    price: 8000,
    capacity: 50,
    type: "Small Gathering",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    description: "Cozy garden cafe for small meetups, bridal showers, and kitty parties.",
  },
  {
    name: "The Private Dining Loft",
    location: "Bangalore, Indiranagar",
    price: 12000,
    capacity: 30,
    type: "Small Gathering",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    description: "Elegant private loft with gourmet dining experience for intimate celebrations.",
  },

  // ── COCKTAIL PARTY ──
  {
    name: "Terrace Vista Lounge",
    location: "Hyderabad, Jubilee Hills",
    price: 28000,
    capacity: 150,
    type: "Cocktail Party",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800",
    description: "Chic terrace lounge with sunset views, premium drinks menu, and live music.",
  },
  {
    name: "Crystal Ballroom Lounge",
    location: "Delhi, Aerocity",
    price: 65000,
    capacity: 250,
    type: "Cocktail Party",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
    description: "Dazzling crystal-lit ballroom with butler service and curated cocktail menu.",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Venue.deleteMany({});
    console.log("🗑️  Cleared existing venues");

    const inserted = await Venue.insertMany(venues);
    console.log(`🌱 Seeded ${inserted.length} venues successfully!\n`);

    inserted.forEach((v) => {
      console.log(`   → ${v.name} (${v.location}) — ₹${v.price.toLocaleString()} | ${v.type}`);
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
