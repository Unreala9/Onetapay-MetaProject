"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AnimatePresence, motion, type Transition } from "framer-motion";

type Mode = "login" | "signup";

const spring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 26,
};

const leftImages = [
  "/Pine/online.jpg",
  "/Pine/instore.jpg",
  "/Pine/prepaid.jpg",
  "/Pine/credit.jpg",
];

const SignInUpForm: React.FC = () => {
  const [mode, setMode] = useState<Mode>("login");

  const [imgIndex, setImgIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % leftImages.length);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  const [lemail, setLEmail] = useState("");
  const [lpassword, setLPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const [name, setName] = useState("");
  const [semail, setSEmail] = useState("");
  const [spassword, setSPassword] = useState("");
  const [sconfirm, setSConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOk(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: lemail.trim(),
      password: lpassword,
    });
    setLoading(false);
    if (error) return setErr(error.message || "Login failed.");
    setOk("Logged in successfully.");
  }

  async function onSignup(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOk(null);
    if (!name.trim()) return setErr("Please enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(semail))
      return setErr("Enter a valid email.");
    if (spassword.length < 6)
      return setErr("Password must be at least 6 characters.");
    if (spassword !== sconfirm) return setErr("Passwords do not match.");

    setLoading(true);
    const { error, data } = await supabase.auth.signUp({
      email: semail.trim(),
      password: spassword,
      options: { data: { name: name.trim() } },
    });
    setLoading(false);
    if (error) return setErr(error.message || "Sign up failed.");
    if (data?.user?.identities?.length === 0) {
      return setErr("This email is already registered. Try logging in.");
    }
    setOk("Account created! Check your email for verification.");
  }

  // 🌐 OAuth login
  async function oauth(provider: "google" | "facebook" | "instagram") {
    if (provider === "instagram") return;
    await supabase.auth.signInWithOAuth({ provider });
  }

  const heading = mode === "login" ? "Login" : "Sign Up";
  const subText =
    mode === "login"
      ? "Please login to continue"
      : "Create your account to continue";

  return (
    <div className="min-h-screen  bg-pink-400/20">
      <div className="p-10">
        <img src="/Pine/logo.png" alt="" />
      </div>
      <div
        className="  w-full flex items-center justify-center p-4"

      >
        <motion.div
          layout
          transition={spring}
          className="relative w-full max-w-5xl rounded-[28px] bg-white/90 backdrop-blur-sm border border-pink-100 shadow-[0_10px_35px_rgba(215,19,125,.18)]"
        >
          {/* subtle top glow */}
          <div className="pointer-events-none absolute -top-3 left-6 right-6 h-3 rounded-b-full bg-gradient-to-r from-[#ff6a3d] via-[#ff2d55] to-[#d7137d] blur-2xl opacity-60" />

          <div className="grid lg:grid-cols-2 gap-0">
            {/* LEFT: rotating circle image */}
            <div className="relative flex items-center justify-center p-10">
              <div className="relative h-72 w-72 sm:h-80 sm:w-80">
                <div className="absolute inset-0 rounded-full blur-2xl opacity-70 bg-gradient-to-br from-[#ff6a3d] via-[#ff2d55] to-[#d7137d]" />
                <div className="relative h-full w-full rounded-full overflow-hidden ring-8 ring-white shadow-xl">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={imgIndex}
                      src={leftImages[imgIndex]}
                      alt="Welcome"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.8 }}
                      className="h-full w-full object-cover"
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* RIGHT: forms */}
            <motion.div layout transition={spring} className="p-8 sm:p-10">
              {/* Toggle */}
              <div className="mb-6 relative inline-flex rounded-full bg-neutral-100 p-1">
                <motion.span
                  layout
                  transition={spring}
                  className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-gradient-to-r from-[#ff6a3d] via-[#ff2d55] to-[#d7137d] shadow ${
                    mode === "login" ? "left-1" : "left-1/2"
                  }`}
                  style={{ left: mode === "login" ? 4 : "50%" }}
                />
                <button
                  onClick={() => {
                    setMode("login");
                    setErr(null);
                    setOk(null);
                  }}
                  className={`relative z-10 px-5 py-2 text-sm font-medium rounded-full transition ${
                    mode === "login"
                      ? "text-white"
                      : "text-neutral-700 hover:text-neutral-900"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setMode("signup");
                    setErr(null);
                    setOk(null);
                  }}
                  className={`relative z-10 px-5 py-2 text-sm font-medium rounded-full transition ${
                    mode === "signup"
                      ? "text-white"
                      : "text-neutral-700 hover:text-neutral-900"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Headings */}
              <motion.h1
                key={heading}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={spring}
                className="text-3xl font-extrabold tracking-tight text-[#d7137d]"
              >
                {heading}
              </motion.h1>
              <motion.p
                key={subText}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "tween", duration: 0.25 }}
                className="mt-1 text-sm text-neutral-500"
              >
                {subText}
              </motion.p>

              {/* Alerts */}
              <AnimatePresence mode="wait">
                {err && (
                  <motion.div
                    key="err"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ type: "tween", duration: 0.2 }}
                    className="mt-4 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-600"
                  >
                    {err}
                  </motion.div>
                )}
                {ok && (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ type: "tween", duration: 0.2 }}
                    className="mt-4 rounded-md bg-green-50 border border-green-200 px-3 py-2 text-xs text-green-700"
                  >
                    {ok}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Forms */}
              <div className="mt-6">
                <AnimatePresence mode="wait">
                  {mode === "login" ? (
                    <motion.form
                      key="login"
                      onSubmit={onLogin}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={spring}
                      className="space-y-5"
                    >
                      <input
                        type="email"
                        placeholder="Email"
                        value={lemail}
                        onChange={(e) => setLEmail(e.target.value)}
                        className="w-full rounded-md border px-4 py-3 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                        required
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={lpassword}
                        onChange={(e) => setLPassword(e.target.value)}
                        className="w-full rounded-md border px-4 py-3 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                        required
                      />
                      <div className="flex items-center justify-between text-sm">
                        <label className="inline-flex items-center gap-2 text-neutral-600 select-none">
                          <input
                            type="checkbox"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                            className="h-4 w-4 rounded border-neutral-300 text-pink-600 focus:ring-pink-500"
                          />
                          Keep Me Login In
                        </label>
                        <button
                          type="button"
                          className="font-medium text-pink-600 hover:text-pink-700"
                        >
                          Forget Password?
                        </button>
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-gradient-to-r from-[#ff6a3d] via-[#ff2d55] to-[#d7137d] px-6 py-3 text-sm font-semibold text-white shadow hover:brightness-110 disabled:opacity-70 transition"
                      >
                        {loading ? "Logging in..." : "Login"}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.form
                      key="signup"
                      onSubmit={onSignup}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={spring}
                      className="space-y-5"
                    >
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-md border px-4 py-3 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={semail}
                        onChange={(e) => setSEmail(e.target.value)}
                        className="w-full rounded-md border px-4 py-3 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                        required
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={spassword}
                        onChange={(e) => setSPassword(e.target.value)}
                        className="w-full rounded-md border px-4 py-3 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                        required
                      />
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        value={sconfirm}
                        onChange={(e) => setSConfirm(e.target.value)}
                        className="w-full rounded-md border px-4 py-3 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                        required
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-gradient-to-r from-[#ff6a3d] via-[#ff2d55] to-[#d7137d] px-6 py-3 text-sm font-semibold text-white shadow hover:brightness-110 disabled:opacity-70 transition"
                      >
                        {loading ? "Creating account..." : "Create Account"}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignInUpForm;
