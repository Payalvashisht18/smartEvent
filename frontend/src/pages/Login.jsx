import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [adminKey, setAdminKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminKey, setShowAdminKey] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields ❌");
      return;
    }
    if (role === "admin" && !adminKey) {
      toast.error("Admin secret key is required 🔑");
      return;
    }
    setLoading(true);
    try {
      const res = await loginUser({ email, password, role, adminKey: role === "admin" ? adminKey : undefined });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success(`Login Successful! Welcome back ${res.data.user.name} ✨`);
      if (res.data.user.role === "admin") {
        setTimeout(() => navigate("/admin"), 1500);
      } else {
        setTimeout(() => navigate("/home"), 1500);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed ❌";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] bg-emerald-600/10 blur-[120px] rounded-full" />

      <div className={`w-full max-w-md bg-slate-900/60 backdrop-blur-3xl p-10 rounded-[40px] border border-white/10 shadow-2xl z-10 transition-all duration-1000 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>

        {/* Icon + Title */}
        <div className="w-20 h-20 bg-indigo-500/20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-inner border border-white/5">
          ✨
        </div>
        <h2 className="text-3xl font-black text-center text-white mb-1 tracking-tight">Welcome Back</h2>
        <p className="text-center text-slate-400 mb-8 text-sm">Sign in to your SmartEvent account</p>

        {/* Role Selector — cards so it's very clear */}
        <div className="mb-8">
          <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Login as</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`flex flex-col items-center gap-1.5 py-4 rounded-2xl border-2 font-bold text-sm transition-all duration-200 ${
                role === "user"
                  ? "border-indigo-500 bg-indigo-500/15 text-white"
                  : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white"
              }`}
            >
              <span className="text-2xl">👤</span>
              <span>User</span>
              <span className="text-[10px] font-normal opacity-60">Browse & book venues</span>
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`flex flex-col items-center gap-1.5 py-4 rounded-2xl border-2 font-bold text-sm transition-all duration-200 ${
                role === "admin"
                  ? "border-amber-500 bg-amber-500/15 text-white"
                  : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white"
              }`}
            >
              <span className="text-2xl">🛡️</span>
              <span>Admin</span>
              <span className="text-[10px] font-normal opacity-60">Manage bookings</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">📧</span>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              placeholder="Email address"
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white/10 transition-all text-white"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              autoComplete="new-password"
              placeholder="Password"
              className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white/10 transition-all text-white"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Admin Secret Key — only shown when Admin is selected */}
          {role === "admin" && (
            <div className="relative">
              <div className="flex items-center gap-2 mb-2 px-1">
                <span className="text-amber-400 text-xs">⚠️</span>
                <p className="text-amber-400 text-xs font-semibold">Enter the admin secret key to proceed</p>
              </div>
              <span className="absolute left-4 top-[58px] -translate-y-1/2 text-slate-500">🔑</span>
              <input
                type={showAdminKey ? "text" : "password"}
                placeholder="Admin Secret Key"
                value={adminKey}
                className="w-full pl-12 pr-12 py-4 bg-amber-500/8 border border-amber-500/30 rounded-2xl outline-none focus:border-amber-500 focus:bg-amber-500/12 transition-all text-white"
                onChange={(e) => setAdminKey(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowAdminKey(!showAdminKey)}
                className="absolute right-4 top-[58px] -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showAdminKey ? "🙈" : "👁️"}
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 ${
              role === "admin"
                ? "bg-gradient-to-r from-amber-600 to-amber-500 shadow-amber-600/20"
                : "bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-indigo-600/20"
            } disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {loading && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-400 text-sm">
          Don't have an account?{" "}
          <span
            className="text-indigo-400 font-bold cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
