import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      console.log("Logged in:", userCredential.user);
      setForm({ email: "", password: "" });
    } catch (error) {
      console.log(error.code, error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] px-4">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 blur-xl opacity-40 animate-pulse"></div>

        <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-bold text-center text-white mb-6 tracking-wide">
            Welcome Back to <span className="text-green-400">Aniverse</span>
          </h3>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400"
              required
            />

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Your password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400"
              required
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-linear-to-r from-green-500 to-blue-600 text-white font-semibold tracking-wide shadow-lg hover:shadow-green-500/30 hover:scale-[1.02] transition-transform"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
