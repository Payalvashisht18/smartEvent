import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { getMyBookings, cancelBooking } from "../services/api";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("Please login to view your bookings");
      navigate("/login");
    }
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await getMyBookings();
      setBookings(res.data);
    } catch (error) {
      toast.error("Failed to fetch your bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await cancelBooking(id);
      toast.success("Booking cancelled successfully");
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-['Outfit',sans-serif]">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 mb-10 shadow-2xl">
          <h1 className="text-4xl font-black mb-10 bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent inline-block border-l-8 border-indigo-500 pl-6">
            My Bookings
          </h1>
          
          <section>
            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-10">
                  <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-10">
                  <span className="text-6xl mb-4 block">🎫</span>
                  <p className="text-slate-500 text-xl font-medium">You have no bookings yet</p>
                </div>
              ) : (
                bookings.map((b) => (
                  <div key={b._id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-indigo-500/30 transition-all gap-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-indigo-400 mb-4">{b.venue?.name || "Hall / Venue"}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-400">
                        <p><span className="font-bold text-slate-300">📍 Location:</span> {b.venue?.location || "N/A"}</p>
                        <p><span className="font-bold text-slate-300">📅 Date:</span> {new Date(b.date).toLocaleDateString("en-IN")}</p>
                        <p><span className="font-bold text-slate-300">💳 Payment:</span> <span className="uppercase">{b.payment}</span></p>
                        <p className="flex items-center gap-2">
                          <span className="font-bold text-slate-300">⚡ Status:</span> 
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            b.status === "confirmed" ? "bg-emerald-500/20 text-emerald-400" : 
                            b.status === "cancelled" ? "bg-rose-500/20 text-rose-400" : 
                            "bg-amber-500/20 text-amber-400"
                          }`}>
                            {b.status}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                      {b.status === "pending" || b.status === "confirmed" ? (
                        <button 
                          className="flex-1 md:flex-none px-6 py-3 bg-rose-600/20 text-rose-400 font-bold rounded-xl border border-rose-500/30 hover:bg-rose-600 hover:text-white hover:-translate-y-0.5 transition-all shadow-lg shadow-rose-600/10"
                          onClick={() => handleCancel(b._id)}
                        >
                          Cancel Booking
                        </button>
                      ) : (
                        <span className="px-6 py-3 bg-white/5 text-slate-500 font-bold rounded-xl border border-white/5">
                          Cancelled
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
