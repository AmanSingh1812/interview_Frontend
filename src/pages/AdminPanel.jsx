import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://unencroached-kori-debasingly.ngrok-free.dev/api";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [roles, setRoles] = useState([]);
  const [skills, setSkills] = useState([]);

  const [newQ, setNewQ] = useState("");
  const [role, setRole] = useState("");
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadMeta();
    loadData();
  }, []);

  async function loadMeta() {
    try {
      const r = await axios.get(`${API}/roles/`);
      const s = await axios.get(`${API}/skills/`);

      setRoles(r.data);
      setSkills(s.data);
    } catch (err) {
      console.error("Failed to load meta", err);
    }
  }

  async function loadData() {
    try {
      const userRes = await axios.get(`${API}/admin/list-users/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(userRes.data);

      const qRes = await axios.get(`${API}/admin/list-questions/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setQuestions(qRes.data);
    } catch (err) {
      console.error("Admin load error", err);

      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        window.location.href = "/login";
      } else {
        alert("❌ You are not allowed to access admin panel");
      }
    }
  }

  async function addQuestion() {
    if (!newQ.trim()) return alert("Enter question");
    if (!role) return alert("Select role");
    if (!skill) return alert("Select skill");
    if (!level) return alert("Select difficulty");

    try {
      await axios.post(
        `${API}/admin/add-question/`,
        { text: newQ, role, skill, level },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNewQ("");
      setRole("");
      setSkill("");
      setLevel("");

      loadData();
    } catch (err) {
      console.error("Add question error", err);
      alert("Unable to add question");
    }
  }

  return (
    <div className="min-h-screen p-8 text-white bg-black">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-[#3b82f6]">
        👑 Admin Dashboard
      </h1>

      {/* ADD QUESTION */}
      <div className="bg-[#0d0d0d] border border-[#1f2937] rounded-2xl p-8 mb-14 max-w-3xl mx-auto shadow-[0_0_25px_rgba(0,0,0,0.7)]">
        <h2 className="text-3xl font-bold mb-6 text-[#3b82f6]">
          ➕ Add Interview Question
        </h2>

        <textarea
          className="w-full p-4 rounded-xl bg-[#111] border border-[#1f2937] text-white"
          placeholder="Enter interview question..."
          rows={3}
          value={newQ}
          onChange={(e) => setNewQ(e.target.value)}
        />

        {/* DROPDOWNS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* ROLE */}
          <select
            className="p-4 rounded-xl bg-[#111] border border-[#1f2937]"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            {roles.map((r, i) => (
              <option key={i} value={r}>
                {r}
              </option>
            ))}
          </select>

          {/* SKILL */}
          <select
            className="p-4 rounded-xl bg-[#111] border border-[#1f2937]"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          >
            <option value="">Select Skill</option>
            {skills.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* LEVEL */}
          <select
            className="p-4 rounded-xl bg-[#111] border border-[#1f2937]"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="">Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button
          onClick={addQuestion}
          className="mt-8 w-full py-4 rounded-xl font-semibold bg-[#3b82f6] hover:bg-[#2563eb]"
        >
          Add Question
        </button>
      </div>

      {/* USERS LIST */}
      <div className="bg-[#0d0d0d] border border-[#1f2937] rounded-2xl p-8 mb-14 max-w-3xl mx-auto shadow-[0_0_25px_rgba(0,0,0,0.7)]">
        <h2 className="text-3xl font-bold mb-6 text-[#3b82f6]">
          👥 Registered Users
        </h2>

        <ul className="space-y-4">
          {users.map((u, i) => (
            <li
              key={i}
              className="p-4 rounded-xl bg-[#111] border border-[#1f2937]"
            >
              <span className="font-bold text-[#3b82f6]">{u.full_name}</span>
              {" — "}
              {u.email} <span className="text-purple-400">({u.role})</span>
            </li>
          ))}
        </ul>
      </div>

      {/* QUESTIONS LIST */}
      <div className="bg-[#0d0d0d] border border-[#1f2937] rounded-2xl p-8 max-w-3xl mx-auto shadow-[0_0_25px_rgba(0,0,0,0.7)]">
        <h2 className="text-3xl font-bold mb-6 text-[#3b82f6]">
          📚 Interview Questions
        </h2>

        <ul className="space-y-4">
          {questions.map((q, i) => (
            <li
              key={i}
              className="p-4 rounded-xl bg-[#111] border border-[#1f2937]"
            >
              <span className="font-bold text-purple-400">
                [{q.role.toUpperCase()} — {q.skill} — {q.level}]
              </span>
              <p className="mt-1 text-gray-300">{q.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
