import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/api";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill all fields ❌");
      return;
    }
    setLoading(true);
    try {
      await signupUser({ name, email, password });
      toast.success("Account Created! You can now login ✨");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const msg = err.response?.data?.message || "Signup failed ❌";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-20%] right-[-20%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-20%] left-[-20%] w-[500px] h-[500px] bg-emerald-600/10 blur-[120px] rounded-full"></div>

      <div className={`w-full max-w-md bg-slate-900/60 backdrop-blur-3xl p-10 rounded-[40px] border border-white/10 shadow-2xl z-10 transition-all duration-1000 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
        <div className="w-20 h-20 bg-indigo-500/20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-inner border border-white/5">
          👋
        </div>
        
        <h2 className="text-3xl font-black text-center text-white mb-2 tracking-tight">Create Account</h2>
        <p className="text-center text-slate-400 mb-10 text-sm">Join us and start celebrating</p>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">👤</span>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white/10 transition-all text-white"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">📧</span>
            <input
              type="email"
              placeholder="Email address"
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white/10 transition-all text-white"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔒</span>
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white/10 transition-all text-white"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3"
          >
            {loading && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-400 text-sm">
          Already have an account?{" "}
          <span className="text-indigo-400 font-bold cursor-pointer hover:underline" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
