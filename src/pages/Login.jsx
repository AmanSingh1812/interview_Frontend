import axios from "axios";
import { useState } from "react";
import { API } from "../config"; // example: https://xxxx.ngrok-free.dev/api

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function loginUser() {
    try {
      const res = await axios.post(`${API}/login/`, {
        username,
        password,
      });

      localStorage.setItem("token", res.data.access);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("is_admin", res.data.is_admin);

      window.location.href = "/profile";
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid username or password");
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white px-4">
      <div
        className="
          w-full max-w-sm 
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
          Login
        </h1>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500 text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        <input
          className="
            w-full p-3 mb-4 rounded-xl 
            bg-[#111] border border-[#1f2937]
            text-white placeholder-gray-400
            focus:border-[#3b82f6]
            focus:shadow-[0_0_10px_rgba(59,130,246,0.6)]
            outline-none transition
          "
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="
            w-full p-3 mb-6 rounded-xl 
            bg-[#111] border border-[#1f2937]
            text-white placeholder-gray-400
            focus:border-[#3b82f6]
            focus:shadow-[0_0_10px_rgba(59,130,246,0.6)]
            outline-none transition
          "
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={loginUser}
          className="
            w-full p-3 rounded-xl font-semibold
            bg-[#3b82f6] hover:bg-[#2563eb]
            shadow-[0_0_15px_rgba(59,130,246,0.6)]
            hover:shadow-[0_0_25px_rgba(59,130,246,0.8)]
            transition-all
          "
        >
          Login
        </button>
      </div>
    </div>
  );
}
