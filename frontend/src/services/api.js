import axios from "axios";

// Base URL of deployed SmartEvent backend
const API = axios.create({
  baseURL: "https://smartevent-1-iiqv.onrender.com/api",
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Authentication APIs
export const signupUser = (data) => API.post("/auth/signup", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getMe = () => API.get("/auth/me");

// Venue APIs
export const getVenues = (params) => API.get("/venues", { params });
export const getVenueById = (id) => API.get(`/venues/${id}`);
export const addVenue = (data) => API.post("/venues", data);

// Booking APIs
export const createBooking = (data) => API.post("/bookings", data);
export const getMyBookings = () => API.get("/bookings/my");
export const getAllBookings = () => API.get("/bookings");
export const cancelBooking = (id) => API.patch(`/bookings/${id}/cancel`);
export const updateBookingStatus = (id, status) =>
  API.patch(`/bookings/${id}/status`, { status });

// Notification APIs
export const getNotifications = () => API.get("/notifications");
export const markNotificationRead = (id) =>
  API.patch(`/notifications/${id}/read`);
export const markAllNotificationsRead = () =>
  API.patch("/notifications/read-all");

export default API;