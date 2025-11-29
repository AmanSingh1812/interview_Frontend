import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav
      className="
        w-full px-8 py-4 flex justify-between items-center
        bg-black/70 backdrop-blur-xl
        border-b border-[#1f2937]
        shadow-[0_0_25px_rgba(0,0,0,0.6)]
      "
    >
      {/* Logo */}
      <Link
        to="/interview"
        className="
          text-3xl font-extrabold 
          text-[#3b82f6]
          drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]
          tracking-wide
        "
      >
        InterviewAI
      </Link>

      {/* Right Menu */}
      {!token ? (
        <div className="flex gap-8 text-gray-300 text-lg">
          <Link
            to="/login"
            className="
              hover:text-white transition
              hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]
            "
          >
            Login
          </Link>

          <Link
            to="/register"
            className="
              hover:text-white transition
              hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]
            "
          >
            Register
          </Link>
        </div>
      ) : (
        <div className="flex gap-8 text-gray-300 items-center text-lg">
          <Link
            to="/resume"
            className="hover:text-white transition hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
          >
            Resume
          </Link>

          <Link
            to="/select-interview"
            className="hover:text-white transition hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
          >
            Interview
          </Link>

          <Link
            to="/dashboard"
            className="hover:text-white transition hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
          >
            Dashboard
          </Link>

          <Link
            to="/profile"
            className="hover:text-white transition hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
          >
            Profile
          </Link>

          {localStorage.getItem("is_admin") === "true" && (
            <Link
              to="/admin"
              className="hover:text-white transition hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
            >
              Admin
            </Link>
          )}

          <button
            onClick={logout}
            className="
              px-4 py-2 rounded-xl font-semibold
              bg-red-600 hover:bg-red-700 text-white
              shadow-[0_0_12px_rgba(220,38,38,0.6)]
              hover:shadow-[0_0_18px_rgba(220,38,38,0.8)]
              transition-all
            "
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
