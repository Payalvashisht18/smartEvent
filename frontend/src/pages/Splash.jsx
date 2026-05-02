import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden font-['Outfit',sans-serif]">
      {/* Background Effects */}
      <div className="absolute top-[-20%] left-[-20%] w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-emerald-600/10 blur-[150px] rounded-full"></div>
      
      {/* Stars/Particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.5,
          }}
        />
      ))}

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:60px_60px]"></div>

      {/* Content */}
      <div className={`relative z-10 text-center transition-all duration-1000 ${mounted ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10"}`}>
        <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter leading-none mb-4">
          <span className="bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-transparent">Smart</span>
          <br />
          <span className="bg-gradient-to-r from-indigo-500 via-emerald-400 to-indigo-500 bg-clip-text text-transparent">Event</span>
        </h1>

        <p className="text-xl md:text-3xl text-slate-400 font-medium tracking-widest uppercase mb-12 opacity-80">
          Find • Book • Celebrate
        </p>

        <button
          className="group relative px-12 py-5 bg-white text-slate-950 text-xl font-black rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(129,140,248,0.5)] transition-all duration-500 active:scale-95"
          onClick={() => navigate("/login")}
        >
          <span className="relative z-10 flex items-center gap-4">
            Get Started
            <span className="text-2xl group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500">🚀</span>
          </span>
          <div className="absolute inset-0 bg-indigo-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
        </button>
      </div>

      {/* Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-white/5 rounded-full pointer-events-none"></div>
    </div>
  );
};

export default Splash;
