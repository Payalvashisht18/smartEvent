const axios = require("axios");

/**
 * Service to fetch venue data from an external API.
 * Example using a generic API structure (adapt based on chosen provider).
 */
const fetchVenuesFromExternalAPI = async (query = "wedding venues", location = "Mumbai") => {
  try {
    const API_KEY = process.env.EXTERNAL_VENUE_API_KEY;
    
    if (!API_KEY || API_KEY === "your_actual_key_here") {
      console.log("Using Mock Data (No API Key found)");
      return [
        {
          name: "Mock Grand Ballroom",
          location: "Mumbai, Central",
          price: 45000,
          capacity: 400,
          type: "Marriage Hall",
          image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
          description: "High-quality mock data for testing your search filters.",
        },
        {
          name: "Mock Garden Lawn",
          location: "Mumbai, West",
          price: 20000,
          capacity: 250,
          type: "Outdoor Party",
          image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
          description: "Perfect for outdoor gatherings and celebrations.",
        }
      ];
    }

    const response = await axios.get("https://api.yelp.com/v3/businesses/search", {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      params: {
        term: query,
        location: location,
        categories: "venues,eventspaces",
        limit: 10,
      },
    });

    // Map Yelp data to our Venue model structure
    const mappedVenues = response.data.businesses.map((business) => {
      // Map Yelp price symbols ($) to numeric values
      const priceMap = { "$": 10000, "$$": 30000, "$$$": 75000, "$$$$": 150000 };
      
      return {
        name: business.name,
        location: `${business.location.address1 || ""}, ${business.location.city}`,
        price: priceMap[business.price] || 25000, // Default price if not provided
        capacity: Math.floor(Math.random() * 400) + 100, // Yelp doesn't provide capacity, using random for demo
        type: business.categories[0]?.title || "Event Space",
        image: business.image_url,
        description: `Rating: ${business.rating} stars (${business.review_count} reviews)`,
      };
    });

    return mappedVenues;
  } catch (error) {
    console.error("Yelp API Error:", error.response?.data || error.message);
    throw new Error("Failed to fetch data from Yelp API");
  }
};

module.exports = { fetchVenuesFromExternalAPI };
