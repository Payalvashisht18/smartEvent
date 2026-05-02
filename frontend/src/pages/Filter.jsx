import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Filter = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setReady(true), 100);
  }, []);

  const handleSearch = () => {
    navigate("/home", { state: { location, budget, capacity, type } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6 relative overflow-hidden">
      {/* Dynamic Background Blobs */}
      <div className="absolute top-[-30%] left-[-20%] w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-rose-600/10 blur-[150px] rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-emerald-600/10 blur-[120px] rounded-full animate-pulse delay-500"></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]"></div>

      <div className={`w-full max-w-lg bg-slate-900/60 backdrop-blur-3xl p-12 rounded-[48px] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] z-10 transition-all duration-1000 ${ready ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"}`}>
        
        <div className="flex justify-center mb-8">
          <div className="text-6xl filter drop-shadow-[0_0_20px_rgba(129,140,248,0.8)] animate-bounce">🔍</div>
        </div>

        <h2 className="text-4xl font-black text-center bg-gradient-to-br from-white via-indigo-100 to-indigo-400 bg-clip-text text-transparent mb-4 tracking-tighter">
          Find Your Venue
        </h2>
        <p className="text-center text-slate-400 mb-10 text-base font-medium">
          Filter and discover the perfect space for your event
        </p>

        <div className="space-y-5">
          <div className="relative group">
            <input
              type="text"
              placeholder="📍  Enter location"
              className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white text-lg outline-none focus:border-indigo-500 focus:bg-white/10 transition-all placeholder:text-slate-600"
              onChange={e => setLocation(e.target.value)}
            />
          </div>

          <div className="relative group">
            <select 
              className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white text-lg outline-none focus:border-indigo-500 focus:bg-white/10 transition-all appearance-none cursor-pointer"
              onChange={e => setBudget(e.target.value)}
            >
              <option value="" className="bg-slate-900">💰  Select Budget</option>
              <option value="low" className="bg-slate-900">Below ₹20k</option>
              <option value="mid" className="bg-slate-900">₹20k – ₹50k</option>
              <option value="high" className="bg-slate-900">Above ₹50k</option>
            </select>
          </div>

          <div className="relative group">
            <select 
              className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white text-lg outline-none focus:border-indigo-500 focus:bg-white/10 transition-all appearance-none cursor-pointer"
              onChange={e => setCapacity(e.target.value)}
            >
              <option value="" className="bg-slate-900">👥  Capacity</option>
              <option value="small" className="bg-slate-900">Below 200</option>
              <option value="medium" className="bg-slate-900">200 – 500</option>
              <option value="large" className="bg-slate-900">500+</option>
            </select>
          </div>

          <div className="relative group">
            <select 
              className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white text-lg outline-none focus:border-indigo-500 focus:bg-white/10 transition-all appearance-none cursor-pointer"
              onChange={e => setType(e.target.value)}
            >
              <option value="" className="bg-slate-900">🎊  Hall Type</option>
              <option value="wedding" className="bg-slate-900">Wedding</option>
              <option value="birthday" className="bg-slate-900">Birthday</option>
              <option value="party" className="bg-slate-900">Party</option>
            </select>
          </div>

          <button 
            className="w-full py-5 mt-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-rose-500 text-white font-black text-xl rounded-2xl shadow-2xl shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all flex items-center justify-center gap-4 relative overflow-hidden group"
            onClick={handleSearch}
          >
            <span>Search Venues</span>
            <span className="text-2xl group-hover:translate-x-2 transition-transform">🚀</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;