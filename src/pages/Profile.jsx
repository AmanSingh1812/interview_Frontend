import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../config"; // example: https://xxx.ngrok-free.dev/api

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You are not logged in.");
          return;
        }

        const res = await axios.get(`${API}/profile/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(res.data);
      } catch (err) {
        console.error("Profile error:", err);
        setError("Failed to load profile");
      }
    }

    loadProfile();
  }, []);

  if (error)
    return (
      <p className="text-center text-red-400 mt-10 bg-black min-h-screen">
        {error}
      </p>
    );

  if (!profile)
    return (
      <p className="text-center text-gray-400 mt-10 bg-black min-h-screen">
        Loading...
      </p>
    );

  return (
    <div className="min-h-screen p-8 text-white bg-black">
      <h2
        className="
          text-5xl font-extrabold text-center mb-12
          text-[#3b82f6]
          drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]
        "
      >
        👤 My Profile
      </h2>

      <div
        className="
          max-w-lg mx-auto 
          bg-[#0d0d0d] border border-[#1f2937]
          rounded-2xl p-8 shadow-[0_0_25px_rgba(0,0,0,0.7)]
          hover:bg-[#111] transition
        "
      >
        <p className="mb-4 text-gray-300 text-lg">
          <span className="text-[#3b82f6] font-semibold">Name: </span>
          {profile.full_name}
        </p>

        <p className="mb-4 text-gray-300 text-lg">
          <span className="text-[#3b82f6] font-semibold">Email: </span>
          {profile.user?.email || "Not provided"}
        </p>

        <p className="mb-4 text-gray-300 text-lg">
          <span className="text-[#3b82f6] font-semibold">Mobile: </span>
          {profile.mobile}
        </p>

        <p className="mb-1 text-gray-300 text-lg">
          <span className="text-[#3b82f6] font-semibold">Role: </span>
          <span className="text-purple-400">{profile.role}</span>
        </p>
      </div>
    </div>
  );
}
