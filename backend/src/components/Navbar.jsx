import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

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
            <div className="flex items-center gap-6">
              <span className="text-sm font-semibold text-white">Hi, {user.name.split(' ')[0]}</span>
              <button 
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all"
                onClick={handleLogout}
              >
                Logout
              </button>
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