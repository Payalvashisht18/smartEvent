import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createBooking } from "../services/api";
import { toast } from "react-toastify";

const Booking = () => {
  const [date, setDate] = useState("");
  const [payment, setPayment] = useState("");
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const venue = location.state?.venue || null;

  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first!");
      navigate("/login");
    }
  }, [navigate]);

  const handleBooking = async () => {
    if (!date || !payment) {
      toast.error("Please fill all details ❌");
      return;
    }

    if (!venue) {
      toast.error("No venue selected. Please go back and select a venue.");
      navigate("/home");
      return;
    }

    setLoading(true);
    try {
      await createBooking({
        venueId: venue._id,
        date,
        guests,
        payment,
      });

      toast.success("Your hall has been booked successfully ✅");      
      setDate("");
      setPayment("");
      setGuests(1);
      setTimeout(() => navigate("/my-bookings"), 2000);
    } catch (err) {
      const msg = err.response?.data?.message || "Error while booking ❌";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6 relative overflow-hidden font-['Outfit',sans-serif]">
      {/* Background Blobs */}
      <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] bg-rose-600/10 blur-[120px] rounded-full"></div>

      <div className={`w-full max-w-lg bg-slate-900/60 backdrop-blur-3xl p-10 rounded-[40px] border border-white/10 shadow-2xl z-10 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="text-center text-5xl mb-6">🎉</div>
        <h2 className="text-4xl font-black text-center bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent mb-2 tracking-tight">Book Your Venue</h2>
        <p className="text-center text-slate-400 mb-10 text-sm">Fill in the details to confirm your event</p>

        {/* Venue Info */}
        {venue && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 flex flex-col gap-1 shadow-inner">
            <p className="text-indigo-400 text-xl font-black">{venue.name}</p>
            <p className="text-slate-400 text-sm flex items-center gap-2">
              <span>📍 {venue.location}</span>
              <span>•</span>
              <span>💰 ₹{venue.price?.toLocaleString()}</span>
            </p>
          </div>
        )}

        <div className="space-y-6">
          {/* Date */}
          <div>
            <label className="block text-slate-300 text-sm font-bold mb-3 ml-1">📅 Event Date</label>
            <input
              type="date"
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-indigo-500 focus:bg-white/10 transition-all"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* Guests */}
          <div>
            <label className="block text-slate-300 text-sm font-bold mb-3 ml-1">👥 Number of Guests</label>
            <input
              type="number"
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-indigo-500 focus:bg-white/10 transition-all"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              min={1}
              max={venue?.capacity || 1000}
              placeholder="Number of guests"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-slate-300 text-sm font-bold mb-3 ml-1">💳 Payment Method</label>
            <select
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-indigo-500 focus:bg-white/10 transition-all appearance-none"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            >
              <option value="" className="bg-slate-900">Select Payment Method</option>
              <option value="card" className="bg-slate-900">💳 Card</option>
              <option value="upi" className="bg-slate-900">📱 UPI</option>
              <option value="cash" className="bg-slate-900">💵 Cash</option>
            </select>
          </div>

          {/* Total */}
          {venue && (
            <div className="text-center py-4 text-emerald-400 text-2xl font-black">
              Total: ₹{venue.price?.toLocaleString()}
            </div>
          )}

          <button
            onClick={handleBooking}
            disabled={loading}
            className="w-full py-5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-black text-lg rounded-2xl shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "⏳ Processing..." : "✅ Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;