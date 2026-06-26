import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-white/10 pt-16 pb-8 relative z-10 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="text-3xl font-black tracking-tighter bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent mb-4">
              Smart<span className="text-indigo-400">Event</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Discover and book the perfect spaces for your events, weddings, and parties in minutes.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-indigo-500/20 hover:text-indigo-400 hover:border-indigo-500/50 transition-all">
                𝕏
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-indigo-500/20 hover:text-indigo-400 hover:border-indigo-500/50 transition-all">
                📷
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-indigo-500/20 hover:text-indigo-400 hover:border-indigo-500/50 transition-all">
                💼
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/home" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Explore Venues</Link></li>
              <li><Link to="/my-bookings" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">My Bookings</Link></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">How it works</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-4">Stay Updated</h3>
            <p className="text-slate-400 text-sm mb-4">Get special offers and updates right in your inbox.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} SmartEvent. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            Made with <span className="text-rose-500 animate-pulse">❤️</span> for great events
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
