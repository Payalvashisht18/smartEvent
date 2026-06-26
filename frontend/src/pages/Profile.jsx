import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


const Profile = () => {
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
    setTimeout(() => setMounted(true), 100);
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col font-['Outfit',sans-serif]">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center p-6 relative overflow-hidden py-20">
        {/* Background Effects */}
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full z-0"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-emerald-600/10 blur-[120px] rounded-full z-0 delay-700"></div>

        <div className={`relative z-10 w-full max-w-2xl bg-slate-900/60 backdrop-blur-3xl border border-white/10 rounded-[40px] p-12 shadow-2xl transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Avatar */}
            <div className="relative">
              <div className="w-40 h-40 rounded-[32px] bg-gradient-to-br from-indigo-500 to-emerald-500 p-1 shadow-2xl shadow-indigo-500/30">
                <div className="w-full h-full bg-slate-900 rounded-[30px] flex items-center justify-center text-6xl font-black text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 px-4 py-1.5 bg-slate-800 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-indigo-400 shadow-xl">
                {user.role}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-black text-white mb-2">{user.name}</h1>
              <p className="text-slate-400 mb-8 flex items-center justify-center md:justify-start gap-2">
                <span>📧</span> {user.email}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Account ID</p>
                  <p className="text-white text-sm font-mono truncate">{user.id}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Status</p>
                  <p className="text-emerald-400 text-sm font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Active
                  </p>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-10 border-white/10" />

          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">Account Settings</h3>
            <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95">
              Edit Profile
            </button>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Profile;
