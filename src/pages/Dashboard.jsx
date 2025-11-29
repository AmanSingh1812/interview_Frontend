import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../config";


export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadStats() {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${API}/dashboard/`,{
          headers: { Authorization: `Bearer ${token}` },
        });

        setStats(res.data);
      } catch (err) {
        console.error("Dashboard error:", err);
      }
    }

    loadStats();
  }, []);

  return (
    <div className="min-h-screen p-8 text-white bg-black">
      <h1
        className="
          text-4xl font-extrabold text-center mb-10
          text-[#3b82f6]
          drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]
        "
      >
        Dashboard Overview
      </h1>

      {/* Stats Card */}
      <div
        className="
          max-w-xl mx-auto 
          bg-[#0d0d0d] border border-[#1f2937]
          rounded-2xl p-8
          shadow-[0_0_25px_rgba(0,0,0,0.7)]
          hover:bg-[#111]
          transition-all
        "
      >
        {!stats ? (
          <p className="text-center text-gray-400 text-lg">Loading…</p>
        ) : (
          <div className="space-y-6 text-gray-200 text-lg">
            {/* Total Attempts */}
            <div
              className="
                p-5 rounded-xl bg-[#111] 
                border border-[#1f2937]
                shadow-[0_0_15px_rgba(0,0,0,0.5)]
                hover:border-[#3b82f6]
                hover:shadow-[0_0_12px_rgba(59,130,246,0.5)]
                transition-all
              "
            >
              <span className="text-gray-400">Total Attempts:</span>{" "}
              <span className="text-[#3b82f6] font-bold drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]">
                {stats.total_attempts}
              </span>
            </div>

            {/* Average Score */}
            <div
              className="
                p-5 rounded-xl bg-[#111] 
                border border-[#1f2937]
                shadow-[0_0_15px_rgba(0,0,0,0.5)]
                hover:border-[#3b82f6]
                hover:shadow-[0_0_12px_rgba(59,130,246,0.5)]
                transition-all
              "
            >
              <span className="text-gray-400">Average Score:</span>{" "}
              <span className="text-[#3b82f6] font-bold drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]">
                {stats.average_score}/10
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ⭐ NEW: REVISE BUTTON */}
      <div className="max-w-xl mx-auto mt-8">
        <button
          onClick={() => navigate("/review")}
          className="
            w-full p-4 rounded-xl font-bold
            bg-purple-600 hover:bg-purple-700
            shadow-[0_0_15px_rgba(168,85,247,0.6)]
            hover:shadow-[0_0_25px_rgba(168,85,247,0.8)]
            transition-all
          "
        >
          🔁 Revise Previous Attempts
        </button>
      </div>
    </div>
  );
}
