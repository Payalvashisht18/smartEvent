// Format price (50000 → ₹50,000)
export const formatPrice = (price) => {
  return "₹" + price.toLocaleString("en-IN");
};

// Format date (2026-03-27 → 27 Mar 2026)
export const formatDate = (date) => {
  const d = new Date(date);
  return d.toDateString();
};

// Capitalize text (delhi → Delhi)
export const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// Check if venue available on selected date
export const isAvailable = (availableDates, selectedDate) => {
  return availableDates.includes(selectedDate);
};