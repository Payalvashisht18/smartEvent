import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVenueById } from "../services/api";

const VenueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const res = await getVenueById(id);
        setVenue(res.data);
      } catch (err) {
        console.error("Error fetching venue:", err);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => setMounted(true), 80);
    fetchVenue();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="text-xl font-medium animate-pulse">Loading Venue...</p>
      </div>
    </div>
  );

  if (!venue) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
      <div className="text-center">
        <span className="text-6xl mb-4 block">🚫</span>
        <p className="text-2xl font-bold">Venue not found</p>
        <button onClick={() => navigate("/home")} className="mt-6 px-8 py-3 bg-indigo-500 text-white rounded-xl font-bold">Go Back Home</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6 relative overflow-hidden font-['Outfit',sans-serif]">
      {/* Background Blobs */}
      <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] bg-rose-600/10 blur-[120px] rounded-full"></div>

      <div className={`relative z-10 w-full max-w-xl bg-slate-900/60 backdrop-blur-3xl rounded-[48px] border border-white/10 shadow-2xl overflow-hidden transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="relative h-72">
          <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
          <span className="absolute top-8 right-8 px-5 py-2 bg-indigo-500/90 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-widest rounded-full">{venue.type}</span>
        </div>

        <div className="p-10 md:p-12">
          <h2 className="text-4xl font-black mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent leading-tight tracking-tight">
            {venue.name}
          </h2>
          
          <div className="space-y-4 mb-8 text-slate-400">
            <div className="flex items-center gap-4 text-lg">
              <span className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg">📍</span> 
              <span>{venue.location}</span>
            </div>
            <div className="flex items-center gap-4 text-lg">
              <span className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg">💰</span> 
              <span className="text-emerald-400 font-bold text-xl">₹{venue.price?.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-4 text-lg">
              <span className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg">👥</span> 
              <span>Capacity: <span className="text-white font-bold">{venue.capacity}</span> guests</span>
            </div>
          </div>

          {venue.description && (
            <p className="text-slate-400 leading-relaxed mb-10 text-base border-l-4 border-indigo-500/30 pl-6 py-2 italic">
              {venue.description}
            </p>
          )}

          <button 
            className="w-full py-5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-black text-xl rounded-2xl shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all flex items-center justify-center gap-3"
            onClick={() => navigate("/booking", { state: { venue } })}
          >
            Book This Venue
            <span className="text-2xl">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;