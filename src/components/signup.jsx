import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import InputField from "./InputField";

const Signup = () => {
const [form, setForm] = useState({
username: "",
email: "",
password: ""
});

const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSignup = async (e) => {
e.preventDefault();
try {
const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
await updateProfile(userCredential.user, { displayName: form.username });
console.log("Signed up:", userCredential.user);
// Optionally reset form
setForm({ username: "", email: "", password: "" });
} catch (error) {
console.log(error.code, error.message);
}
};

return ( <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] px-4"> <div className="relative w-full max-w-md"> <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 blur-xl opacity-40 animate-pulse"></div>

```
    <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
      <h3 className="text-3xl font-bold text-center text-white mb-6 tracking-wide">
        Create Your <span className="text-green-400">Aniverse</span> Account
      </h3>

      <form onSubmit={handleSignup} className="space-y-5">
        <InputField
          id="username"
          name="username"
          type="text"
          placeholder="Your username"
          value={form.username}
          onChange={handleChange}
        />
        <InputField
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
        />
        <InputField
          id="password"
          name="password"
          type="password"
          placeholder="Create a password"
          value={form.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-linear-to-r from-green-500 to-blue-600 text-white font-semibold tracking-wide shadow-lg hover:shadow-green-500/30 hover:scale-[1.02] transition-transform"
        >
          Sign Up
        </button>
      </form>
    </div>
  </div>
</div>

);
};

export default Signup;
