import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "https://unencroached-kori-debasingly.ngrok-free.dev/api";


export default function SelectInterview() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("");

  const [roles, setRoles] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    async function loadMeta() {
      try {
        const r = await axios.get(`${API}/roles/`);
        const s = await axios.get(`${API}/skills/`);

        setRoles(r.data);
        setSkills(s.data);
      } catch (err) {
        console.error("Meta load failed", err);
        alert("Failed to load roles/skills");
      }
    }

    loadMeta();
  }, []);

  function startInterview() {
    const params = [];

    if (role) params.push(`role=${encodeURIComponent(role)}`);
    if (skill) params.push(`skill=${encodeURIComponent(skill)}`);
    if (level) params.push(`level=${encodeURIComponent(level)}`);

    if (params.length === 0) {
      alert("Choose at least 1 filter");
      return;
    }

    navigate("/interview?" + params.join("&"));
  }

  console.log("Roles API Response:", roles);
  

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h2 className="text-4xl font-bold text-center mb-10 text-blue-400">
        🎯 Choose Your Interview Type
      </h2>

      <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700">
        {/* ROLE */}
        <label>Role</label>
        <select
          className="w-full p-3 bg-gray-800 mt-1 mb-5 rounded-xl border border-gray-700"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">-- Select Role --</option>
          {roles.map((r, i) => (
            <option key={i} value={r}>
              {r}
            </option>
          ))}
        </select>

        {/* SKILL */}
        <label>Skill</label>
        <select
          className="w-full p-3 bg-gray-800 mt-1 mb-5 rounded-xl border border-gray-700"
          onChange={(e) => setSkill(e.target.value)}
        >
          <option value="">-- Select Skill --</option>
          {skills.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* DIFFICULTY */}
        <label>Difficulty</label>
        <select
          className="w-full p-3 bg-gray-800 mt-1 mb-5 rounded-xl border border-gray-700"
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="">-- Select Difficulty --</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button
          onClick={startInterview}
          className="w-full py-3 bg-blue-500 mt-3 rounded-xl hover:bg-blue-600"
        >
          Start Interview
        </button>
      </div>
    </div>
  );
}
