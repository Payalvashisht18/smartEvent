import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getVenues } from "../services/api";
import Navbar from "../components/Navbar";
 
const Home = () => {
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("");
  const [mounted, setMounted] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
 
  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
    fetchVenues();
  }, []);
 
  const fetchVenues = async () => {
    try {
      setLoading(true);
      const res = await getVenues();
      setVenues(res.data);
      res.data.forEach((_, i) => {
        setTimeout(() => {
          setVisibleCards((prev) => [...prev, i]);
        }, 100 + i * 120);
      });
    } catch (err) {
      console.error("Error fetching venues:", err);
    } finally {
      setLoading(false);
    }
  };
 
  const filteredVenues = venues.filter((v) => {
    const matchLocation = location ? v.location.toLowerCase().includes(location.toLowerCase()) : true;
    const matchBudget = budget === "low" ? v.price < 20000
      : budget === "mid" ? v.price >= 20000 && v.price <= 50000
      : budget === "high" ? v.price > 50000 : true;
    const matchCapacity = capacity === "small" ? v.capacity < 200
      : capacity === "medium" ? v.capacity >= 200 && v.capacity <= 500
      : capacity === "large" ? v.capacity > 500 : true;
    const matchType = type ? v.type.toLowerCase().includes(type.toLowerCase()) : true;
    return matchLocation && matchBudget && matchCapacity && matchType;
  });
 
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden">
      <Navbar />
 
      {/* Background Blobs */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full z-0 animate-pulse"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-600/20 blur-[120px] rounded-full z-0 animate-pulse delay-700"></div>
 
      <div className={`relative z-10 max-w-7xl mx-auto px-6 py-16 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            Find Your Perfect Venue
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Discover amazing spaces for every occasion
          </p>
        </div>
 
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl mb-16">
          <div className="relative flex items-center">
            <span className="absolute left-4 text-xl opacity-60">📍</span>
            <input
              type="text"
              placeholder="Search location..."
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white/10 transition-all"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-xl opacity-60">💰</span>
            <select 
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white/10 appearance-none"
              onChange={(e) => setBudget(e.target.value)}
            >
              <option value="" className="bg-slate-900">Budget</option>
              <option value="low" className="bg-slate-900">Below ₹20k</option>
              <option value="mid" className="bg-slate-900">₹20k - ₹50k</option>
              <option value="high" className="bg-slate-900">Above ₹50k</option>
            </select>
          </div>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-xl opacity-60">👥</span>
            <select 
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white/10 appearance-none"
              onChange={(e) => setCapacity(e.target.value)}
            >
              <option value="" className="bg-slate-900">Capacity</option>
              <option value="small" className="bg-slate-900">Below 200</option>
              <option value="medium" className="bg-slate-900">200-500</option>
              <option value="large" className="bg-slate-900">500+</option>
            </select>
          </div>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-xl opacity-60">🎊</span>
            <select 
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white/10 appearance-none"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="" className="bg-slate-900">Type</option>
              <option value="wedding" className="bg-slate-900">Wedding</option>
              <option value="birthday" className="bg-slate-900">Birthday</option>
              <option value="party" className="bg-slate-900">Party</option>
              <option value="conference" className="bg-slate-900">Conference</option>
            </select>
          </div>
        </div>
 
        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVenues.length > 0 ? (
            filteredVenues.map((v, i) => (
              <div
                key={v._id}
                className={`group bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-[32px] overflow-hidden hover:border-indigo-500/40 hover:-translate-y-2 transition-all duration-500 ${visibleCards.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                  <span className="absolute top-6 right-6 px-4 py-1.5 bg-indigo-500/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full">{v.type}</span>
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-4 text-white">{v.name}</h2>
                  <div className="space-y-3 mb-8 text-slate-400 text-sm">
                    <p className="flex items-center gap-3"><span>📍</span> {v.location}</p>
                    <p className="flex items-center gap-3"><span>💰</span> ₹{v.price?.toLocaleString()}</p>
                    <p className="flex items-center gap-3"><span>👥</span> {v.capacity} guests</p>
                  </div>
                  <button
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 active:scale-[0.98] transition-all"
                    onClick={() => navigate("/booking", { state: { venue: v } })}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            !loading && (
              <div className="col-span-full text-center py-20">
                <span className="text-6xl mb-6 block">😢</span>
                <p className="text-slate-400 text-xl font-medium">No venues found for your filters</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
 
export default Home;
