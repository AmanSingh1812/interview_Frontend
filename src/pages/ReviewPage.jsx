import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const API = "https://unencroached-kori-debasingly.ngrok-free.dev/api";


export default function ReviewPage() {
  const [list, setList] = useState([]);
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get("session");

  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${API}/session/questions/?session_id=${sessionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setList(res.data);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-black text-white">
      <h1 className="text-3xl font-bold mb-8 text-blue-400">
        📘 Review Session
      </h1>

      {list.length === 0 ? (
        <p>No questions attempted in this session</p>
      ) : (
        list.map((q, i) => (
          <div key={i} className="bg-gray-900 p-4 rounded-xl mb-4">
            <h3 className="text-xl text-blue-400">
              Q{i + 1}: {q.question}
            </h3>
            <p className="text-gray-300 mt-2">
              <b>Score:</b> {q.score}/10
            </p>
            <p className="text-gray-300 mt-2">
              <b>Improved Answer:</b> {q.improved_answer}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
