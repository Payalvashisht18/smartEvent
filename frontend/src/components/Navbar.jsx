import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-[1000] w-full h-20 bg-slate-950/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto h-full flex justify-between items-center px-6">
        <div 
          className="text-2xl font-black cursor-pointer tracking-tighter bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent"
          onClick={() => navigate("/home")}
        >
          Smart<span className="text-indigo-400">Event</span>
        </div>

        <ul className="hidden md:flex items-center gap-10 list-none">
          <li 
            className="text-sm font-medium text-slate-400 cursor-pointer hover:text-white transition-colors relative group"
            onClick={() => navigate("/home")}
          >
            Venues
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 transition-all group-hover:w-full"></span>
          </li>
          {user?.role === "admin" && (
            <li 
              className="text-sm font-medium text-slate-400 cursor-pointer hover:text-white transition-colors relative group"
              onClick={() => navigate("/admin")}
            >
              Admin Dashboard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 transition-all group-hover:w-full"></span>
            </li>
          )}
          {user && user.role !== "admin" && (
            <li 
              className="text-sm font-medium text-slate-400 cursor-pointer hover:text-white transition-colors relative group"
              onClick={() => navigate("/my-bookings")}
            >
              My Bookings
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 transition-all group-hover:w-full"></span>
            </li>
          )}
        </ul>

        <div className="flex items-center">
          {user ? (
            <div className="relative">
              <div 
                className="flex items-center gap-3 cursor-pointer bg-white/5 border border-white/10 px-3 py-2 rounded-2xl hover:bg-white/10 transition-all"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-sm font-black text-white shadow-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-bold text-white hidden md:block">{user.name.split(' ')[0]}</span>
                <span className="text-slate-400 text-xs">▼</span>
              </div>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-sm font-bold text-white truncate">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <button 
                      className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors flex items-center gap-2"
                      onClick={() => { setDropdownOpen(false); navigate("/profile"); }}
                    >
                      <span>👤</span> Profile
                    </button>
                    <button 
                      className="w-full text-left px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 rounded-xl transition-colors flex items-center gap-2"
                      onClick={handleLogout}
                    >
                      <span>🚪</span> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button 
              className="px-6 py-2.5 rounded-xl font-bold bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;