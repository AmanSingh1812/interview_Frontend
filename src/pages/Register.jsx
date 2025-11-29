import { useState } from "react";
import axios from "axios";
import { API } from "../config"; // example: https://xxxx.ngrok-free.dev/api

export default function Register() {
  const [form, setForm] = useState({
    full_name: "",
    username: "",
    email: "",
    mobile: "",
    role: "Student",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function registerUser() {
    setError("");

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      await axios.post(`${API}/register/`, {
        full_name: form.full_name,
        username: form.username,
        email: form.email,
        mobile: form.mobile,
        role: form.role,
        password: form.password,
      });

      alert("Account created! You can now log in.");
      window.location.href = "/login";
    } catch (e) {
      console.error("Register error:", e);
      setError("Registration failed. Username or email may already exist.");
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-black px-4 text-white">
      <div
        className="
          w-full max-w-md 
          bg-[#0d0d0d] border border-[#1f2937]
          rounded-2xl p-8 shadow-[0_0_25px_rgba(0,0,0,0.6)]
        "
      >
        <h1
          className="
            text-3xl font-bold text-center mb-8
            text-[#3b82f6]
            drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]
          "
        >
          Create Account
        </h1>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500 text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            name="full_name"
            placeholder="Full Name"
            className="
              w-full p-3 rounded-xl bg-[#111] 
              border border-[#1f2937] text-white placeholder-gray-400
              focus:border-[#3b82f6] focus:shadow-[0_0_10px_rgba(59,130,246,0.6)]
            "
            onChange={updateField}
          />

          <input
            name="username"
            placeholder="Username"
            className="
              w-full p-3 rounded-xl bg-[#111] 
              border border-[#1f2937] text-white placeholder-gray-400
              focus:border-[#3b82f6]
            "
            onChange={updateField}
          />

          <input
            name="email"
            placeholder="Email"
            type="email"
            className="
              w-full p-3 rounded-xl bg-[#111] 
              border border-[#1f2937] text-white placeholder-gray-400
              focus:border-[#3b82f6]
            "
            onChange={updateField}
          />

          <input
            name="mobile"
            placeholder="Mobile Number"
            className="
              w-full p-3 rounded-xl bg-[#111] 
              border border-[#1f2937] text-white placeholder-gray-400
              focus:border-[#3b82f6]
            "
            onChange={updateField}
          />

          <select
            name="role"
            className="
              w-full p-3 rounded-xl bg-[#111] 
              border border-[#1f2937] text-white
              focus:border-[#3b82f6]
            "
            onChange={updateField}
          >
            <option>Student</option>
            <option>Job Seeker</option>
            <option>Working Professional</option>
          </select>

          <input
            name="password"
            placeholder="Password"
            type="password"
            className="
              w-full p-3 rounded-xl bg-[#111] 
              border border-[#1f2937] text-white placeholder-gray-400
              focus:border-[#3b82f6]
            "
            onChange={updateField}
          />

          <input
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            className="
              w-full p-3 rounded-xl bg-[#111] 
              border border-[#1f2937] text-white placeholder-gray-400
              focus:border-[#3b82f6]
            "
            onChange={updateField}
          />

          <button
            onClick={registerUser}
            className="
              w-full p-3 rounded-xl font-semibold
              bg-green-600 hover:bg-green-700
              shadow-[0_0_15px_rgba(22,163,74,0.6)]
            "
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
