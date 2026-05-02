import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { getAllBookings, getNotifications as fetchNotificationsAPI, updateBookingStatus } from "../services/api";

const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      toast.error("Not authorized to access Admin panel");
      navigate("/home");
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const bookingRes = await getAllBookings();
      const bookingData = bookingRes.data;

      const notificationRes = await fetchNotificationsAPI();
      const notificationData = notificationRes.data;

      setBookings(bookingData);
      setNotifications(notificationData);
    } catch (error) {
      toast.error("Failed to fetch admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      toast.success(`Booking ${status} successfully`);
      fetchData();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-['Outfit',sans-serif]">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 mb-10 shadow-2xl">
          <h1 className="text-4xl font-black mb-10 bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent inline-block border-l-8 border-indigo-500 pl-6">
            Admin Dashboard
          </h1>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">🔔</span> Notifications
            </h2>
            <div className="space-y-4">
              {notifications.length === 0 ? (
                <p className="text-slate-500 italic">No notifications yet</p>
              ) : (
                notifications.map((n) => (
                  <div key={n._id} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all border-l-4 border-l-emerald-500">
                    <h3 className="text-lg font-bold text-white mb-1">{n.title}</h3>
                    <p className="text-slate-400 text-sm">{n.message}</p>
                  </div>
                ))
              )}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">📅</span> All Bookings
            </h2>
            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-10">
                  <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                </div>
              ) : bookings.length === 0 ? (
                <p className="text-slate-500 italic">No bookings found</p>
              ) : (
                bookings.map((b) => (
                  <div key={b._id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-indigo-500/30 transition-all gap-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-indigo-400 mb-4">{b.venueName || b.venue?.name || "Hall / Venue"}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-400">
                        <p><span className="font-bold text-slate-300">👤 Customer:</span> {b.customerName || b.user?.name || "Guest User"}</p>
                        <p><span className="font-bold text-slate-300">📅 Date:</span> {new Date(b.date).toLocaleDateString("en-IN")}</p>
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
                      {b.status === "pending" ? (
                        <>
                          <button 
                            className="flex-1 md:flex-none px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-500 hover:-translate-y-0.5 transition-all shadow-lg shadow-emerald-600/20"
                            onClick={() => updateStatus(b._id, "confirmed")}
                          >
                            Confirm
                          </button>
                          <button 
                            className="flex-1 md:flex-none px-6 py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-500 hover:-translate-y-0.5 transition-all shadow-lg shadow-rose-600/20"
                            onClick={() => updateStatus(b._id, "cancelled")}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <span className="text-slate-600 italic text-sm">Action completed</span>
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

export default Admin;