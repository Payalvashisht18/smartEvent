import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/api";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  const passwordStrength = () => {
    if (!password) return null;
    if (password.length < 6) return { label: "Too short", color: "bg-rose-500", text: "text-rose-400", width: "25%" };
    if (password.length < 8) return { label: "Weak", color: "bg-orange-500", text: "text-orange-400", width: "50%" };
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) return { label: "Medium", color: "bg-yellow-500", text: "text-yellow-400", width: "75%" };
    return { label: "Strong 💪", color: "bg-emerald-500", text: "text-emerald-400", width: "100%" };
  };

  const strength = passwordStrength();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill all fields ❌");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (confirmPassword && password !== confirmPassword) {
      toast.error("Passwords do not match ❌");
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
      <div className="absolute top-[-20%] right-[-20%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-20%] left-[-20%] w-[500px] h-[500px] bg-emerald-600/10 blur-[120px] rounded-full" />

      <div className={`w-full max-w-md bg-slate-900/60 backdrop-blur-3xl p-10 rounded-[40px] border border-white/10 shadow-2xl z-10 transition-all duration-1000 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>

        {/* Icon + Title */}
        <div className="w-20 h-20 bg-indigo-500/20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-inner border border-white/5">
          👋
        </div>
        <h2 className="text-3xl font-black text-center text-white mb-1 tracking-tight">Create Account</h2>
        <p className="text-center text-slate-400 mb-8 text-sm">Join us and start booking amazing venues</p>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-5" autoComplete="off">
          {/* Name */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">👤</span>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              placeholder="Full Name"
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white/10 transition-all text-white"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
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

          {/* Password */}
          <div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                autoComplete="new-password"
                placeholder="Password (min. 6 characters)"
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
            {/* Strength Bar */}
            {strength && (
              <div className="mt-2 px-1">
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${strength.color}`}
                    style={{ width: strength.width }}
                  />
                </div>
                <p className={`text-xs mt-1 font-semibold ${strength.text}`}>{strength.label}</p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">✅</span>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="new-password"
              placeholder="Confirm Password"
              className={`w-full pl-12 pr-12 py-4 bg-white/5 border rounded-2xl outline-none focus:bg-white/10 transition-all text-white ${
                confirmPassword && password !== confirmPassword
                  ? "border-rose-500 focus:border-rose-500"
                  : confirmPassword && password === confirmPassword
                  ? "border-emerald-500 focus:border-emerald-500"
                  : "border-white/10 focus:border-indigo-500"
              }`}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPassword && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2">
                {password === confirmPassword ? "✅" : "❌"}
              </span>
            )}
          </div>
          {confirmPassword && password !== confirmPassword && (
            <p className="text-xs text-rose-400 -mt-3 pl-1">Passwords do not match</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-400 text-sm">
          Already have an account?{" "}
          <span
            className="text-indigo-400 font-bold cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
