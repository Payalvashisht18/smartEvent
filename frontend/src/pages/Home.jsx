import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getVenues } from "../services/api";
import Navbar from "../components/Navbar";
import SkeletonLoader from "../components/SkeletonLoader";

const CATEGORIES = [
  { label: "All",             icon: "✨" },
  { label: "Wedding",         icon: "💍" },
  { label: "Birthday",        icon: "🎂" },
  { label: "Conference",      icon: "💼" },
  { label: "Party",           icon: "🎉" },
  { label: "Outdoor Event",   icon: "🌿" },
  { label: "Small Gathering", icon: "☕" },
  { label: "Cocktail Party",  icon: "🍸" },
];

const SORT_OPTIONS = [
  { value: "default",      label: "✨ Featured"      },
  { value: "price_asc",   label: "💰 Price: Low → High" },
  { value: "price_desc",  label: "💰 Price: High → Low" },
  { value: "capacity",    label: "👥 Capacity"       },
];

// Stable deterministic rating & review count per venue name
const stableRating  = (n) => { let h=0; for(let c of n) h=c.charCodeAt(0)+((h<<5)-h); return (4.3+(Math.abs(h)%8)/10).toFixed(1); };
const stableReviews = (n) => { let h=0; for(let c of n) h=c.charCodeAt(0)+((h<<3)-h); return 38+(Math.abs(h)%170); };
// Mark top-priced venues as "Premium"
const isPremium = (v, all) => v.price >= (all.length ? [...all].sort((a,b)=>b.price-a.price)[Math.floor(all.length*0.25)].price : Infinity);

const Home = () => {
  const [locationQ, setLocationQ]       = useState("");
  const [budget, setBudget]             = useState("");
  const [capacity, setCapacity]         = useState("");
  const [activeCategory, setActive]     = useState("All");
  const [sortBy, setSortBy]             = useState("default");
  const [wishlist, setWishlist]         = useState(() => JSON.parse(localStorage.getItem("wishlist") || "[]"));
  const [mounted, setMounted]           = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const [venues, setVenues]             = useState([]);
  const [loading, setLoading]           = useState(true);
  const navigate = useNavigate();

  const user      = JSON.parse(localStorage.getItem("user") || "{}");
  const firstName = user?.name?.split(" ")[0] || "there";

  useEffect(() => { setTimeout(() => setMounted(true), 80); fetchVenues(); }, []);

  const fetchVenues = async () => {
    try {
      setLoading(true);
      const res = await getVenues();
      setVenues(res.data);
      res.data.forEach((_, i) =>
        setTimeout(() => setVisibleCards(p => [...p, i]), 100 + i * 70)
      );
    } catch (err) {
      console.error("Error fetching venues:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = (id) => {
    const updated = wishlist.includes(id) ? wishlist.filter(x => x !== id) : [...wishlist, id];
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const filteredVenues = useMemo(() => {
    let list = venues.filter(v => {
      const matchLoc = locationQ ? v.location.toLowerCase().includes(locationQ.toLowerCase()) : true;
      const matchBudget =
        budget === "low"  ? v.price < 20000 :
        budget === "mid"  ? v.price >= 20000 && v.price <= 75000 :
        budget === "high" ? v.price > 75000 : true;
      const matchCap =
        capacity === "small"  ? v.capacity < 200 :
        capacity === "medium" ? v.capacity >= 200 && v.capacity <= 500 :
        capacity === "large"  ? v.capacity > 500 : true;
      const matchCat = activeCategory === "All" ? true : v.type === activeCategory;
      return matchLoc && matchBudget && matchCap && matchCat;
    });

    if (sortBy === "price_asc")  list = [...list].sort((a,b) => a.price - b.price);
    if (sortBy === "price_desc") list = [...list].sort((a,b) => b.price - a.price);
    if (sortBy === "capacity")   list = [...list].sort((a,b) => b.capacity - a.capacity);
    return list;
  }, [venues, locationQ, budget, capacity, activeCategory, sortBy]);

  const hasFilters = locationQ || budget || capacity || activeCategory !== "All";
  const clearAll   = () => { setLocationQ(""); setBudget(""); setCapacity(""); setActive("All"); setSortBy("default"); };

  return (
    <div className="min-h-screen bg-[#080b14] text-slate-50 relative overflow-x-hidden" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <Navbar />

      {/* ── Ambient background ── */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] right-[-15%] w-[700px] h-[700px] bg-indigo-700/12 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-700/10 blur-[140px] rounded-full" />
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-emerald-700/8 blur-[120px] rounded-full" />
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto px-5 pt-10 pb-20 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        {/* ── HERO ── */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/15 border border-indigo-500/30 rounded-full text-indigo-300 text-xs font-semibold mb-4">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
              👋 Welcome back, {firstName}!
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Find Your Perfect
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
                Event Venue
              </span>
            </h1>
            <p className="text-slate-500 text-sm mt-3 max-w-lg">
              {venues.length} venues across India — weddings, birthdays, conferences &amp; more. All in one place.
            </p>
          </div>

          {/* Wishlist pill */}
          {wishlist.length > 0 && (
            <button
              onClick={() => navigate("/my-bookings")}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-3 bg-rose-500/15 border border-rose-500/30 rounded-2xl text-rose-300 text-sm font-bold hover:bg-rose-500/25 transition-all"
            >
              ❤️ {wishlist.length} Saved
            </button>
          )}
        </div>

        {/* ── SEARCH BAR ── */}
        <div className="relative mb-6">
          <div className="flex flex-col md:flex-row gap-3 p-4 bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-black/30">
            {/* Location */}
            <div className="relative flex-1 flex items-center">
              <span className="absolute left-4 text-base pointer-events-none opacity-50">📍</span>
              <input
                type="text"
                value={locationQ}
                placeholder="Search city, area..."
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/8 rounded-2xl outline-none focus:border-indigo-500/60 focus:bg-white/10 transition-all text-white text-sm placeholder:text-slate-600"
                onChange={e => setLocationQ(e.target.value)}
              />
            </div>

            {/* Budget */}
            <div className="relative flex items-center">
              <span className="absolute left-4 text-base pointer-events-none opacity-50">💰</span>
              <select
                className="pl-11 pr-8 py-3 bg-white/5 border border-white/8 rounded-2xl outline-none focus:border-indigo-500/60 appearance-none text-white text-sm cursor-pointer min-w-[150px]"
                value={budget}
                onChange={e => setBudget(e.target.value)}
              >
                <option value="" className="bg-slate-900">All Budgets</option>
                <option value="low" className="bg-slate-900">Below ₹20k</option>
                <option value="mid" className="bg-slate-900">₹20k – ₹75k</option>
                <option value="high" className="bg-slate-900">Above ₹75k</option>
              </select>
            </div>

            {/* Capacity */}
            <div className="relative flex items-center">
              <span className="absolute left-4 text-base pointer-events-none opacity-50">👥</span>
              <select
                className="pl-11 pr-8 py-3 bg-white/5 border border-white/8 rounded-2xl outline-none focus:border-indigo-500/60 appearance-none text-white text-sm cursor-pointer min-w-[150px]"
                value={capacity}
                onChange={e => setCapacity(e.target.value)}
              >
                <option value="" className="bg-slate-900">Any Capacity</option>
                <option value="small" className="bg-slate-900">Below 200</option>
                <option value="medium" className="bg-slate-900">200–500</option>
                <option value="large" className="bg-slate-900">500+ guests</option>
              </select>
            </div>

            {/* Sort */}
            <div className="relative flex items-center">
              <select
                className="pl-4 pr-8 py-3 bg-indigo-600/80 border border-indigo-500/40 rounded-2xl outline-none text-white text-sm font-bold cursor-pointer min-w-[160px]"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value} className="bg-slate-900 font-normal">{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ── CATEGORY CHIPS ── */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-8" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map(cat => {
            const count = venues.filter(v => cat.label === "All" ? true : v.type === cat.label).length;
            return (
              <button
                key={cat.label}
                onClick={() => setActive(cat.label)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-all duration-200 border ${
                  activeCategory === cat.label
                    ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/25 scale-105"
                    : "bg-white/[0.04] border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeCategory === cat.label ? "bg-white/20 text-white" : "bg-white/8 text-slate-500"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── RESULTS META ── */}
        {!loading && (
          <div className="flex items-center justify-between mb-5">
            <p className="text-slate-500 text-sm">
              <span className="text-white font-bold text-base">{filteredVenues.length}</span> {filteredVenues.length === 1 ? "venue" : "venues"}
              {activeCategory !== "All" && <span className="text-indigo-400"> · {activeCategory}</span>}
            </p>
            {hasFilters && (
              <button onClick={clearAll} className="text-xs text-rose-400/80 hover:text-rose-300 font-semibold flex items-center gap-1 transition-colors">
                <span>✕</span> Clear all
              </button>
            )}
          </div>
        )}

        {/* ── VENUE GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {loading ? (
            <SkeletonLoader count={9} type="venue" />
          ) : filteredVenues.length > 0 ? (
            filteredVenues.map((v, i) => {
              const rating  = stableRating(v.name);
              const reviews = stableReviews(v.name);
              const premium = isPremium(v, venues);
              const saved   = wishlist.includes(v._id);

              return (
                <div
                  key={v._id}
                  className={`group relative bg-white/[0.03] border border-white/[0.07] rounded-[24px] overflow-hidden hover:border-indigo-500/35 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-900/30 transition-all duration-500 ${
                    visibleCards.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 55}ms` }}
                >
                  {/* ── Image ── */}
                  <div className="relative h-[200px] overflow-hidden">
                    <img
                      src={v.image}
                      alt={v.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080b14] via-[#080b14]/30 to-transparent" />

                    {/* Top left — type badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-3 py-1 bg-slate-950/75 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-full border border-white/10">
                        {v.type}
                      </span>
                      {premium && (
                        <span className="px-2.5 py-1 bg-amber-500/90 backdrop-blur-md text-amber-950 text-[9px] font-black uppercase tracking-widest rounded-full">
                          ⭐ Premium
                        </span>
                      )}
                    </div>

                    {/* Top right — wishlist heart */}
                    <button
                      onClick={e => { e.stopPropagation(); toggleWishlist(v._id); }}
                      className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center text-base transition-all duration-200 border ${
                        saved
                          ? "bg-rose-500/90 border-rose-400/50 text-white scale-110"
                          : "bg-slate-950/60 border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-400/30"
                      }`}
                    >
                      {saved ? "❤️" : "🤍"}
                    </button>

                    {/* Bottom of image — price */}
                    <div className="absolute bottom-3 right-3">
                      <span className="px-3 py-1.5 bg-indigo-600/90 backdrop-blur-md text-white text-xs font-black rounded-xl">
                        ₹{v.price?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* ── Card Body ── */}
                  <div className="p-5">
                    {/* Name + Rating row */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h2 className="text-base font-black text-white leading-snug flex-1">{v.name}</h2>
                      <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
                        <span className="text-yellow-400 text-xs">⭐</span>
                        <span className="text-white text-xs font-bold">{rating}</span>
                        <span className="text-slate-600 text-[10px]">({reviews})</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">{v.description}</p>

                    {/* Info pills */}
                    <div className="flex items-center gap-2 mb-5 flex-wrap">
                      <span className="flex items-center gap-1 px-2.5 py-1 bg-white/5 rounded-lg text-xs text-slate-400">
                        📍 {v.location.split(",")[0]}
                      </span>
                      <span className="flex items-center gap-1 px-2.5 py-1 bg-white/5 rounded-lg text-xs text-slate-400">
                        👥 {v.capacity.toLocaleString()} guests
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/venue/${v._id}`)}
                        className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-all"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => navigate("/booking", { state: { venue: v } })}
                        className="flex-[2] py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold shadow-lg shadow-indigo-700/25 hover:shadow-indigo-700/45 hover:opacity-90 active:scale-[0.98] transition-all"
                      >
                        Book Now →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            !loading && (
              <div className="col-span-full text-center py-28">
                <div className="text-6xl mb-5">🔍</div>
                <p className="text-white text-lg font-black mb-2">No venues found</p>
                <p className="text-slate-500 text-sm mb-6">Try a different location, budget or event type</p>
                <button
                  onClick={clearAll}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl text-sm transition-all"
                >
                  Clear filters
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
