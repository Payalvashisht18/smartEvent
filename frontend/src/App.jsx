import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Splash from "./pages/Splash"
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import VenueDetails from "./pages/VenueDetails";
import Filter from "./pages/Filter";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";
import MyBookings from "./pages/MyBookings";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/venue/:id" element={<VenueDetails />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;