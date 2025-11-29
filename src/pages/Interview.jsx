import { useEffect, useRef, useState } from "react";
import Recorder from "../components/Recorder";
import ScoreCard from "../components/ScoreCard";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API } from "../config";

export default function Interview() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [liveText, setLiveText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const sessionId = useRef(Date.now().toString());
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const role = params.get("role") || "";
  const skill = params.get("skill") || "";
  const level = params.get("level") || "";

  // Prevent opening page with empty values
  useEffect(() => {
    if (!role && !skill && !level) {
      window.location.href = "/select-interview";
    }
  }, [role, skill, level]);

  // LOAD QUESTION
  const loadQuestion = async () => {
    try {
      const res = await axios.get(
        `${API}get_question/?role=${role}&skill=${skill}&level=${level}`
      );

      setQuestion(res.data.text);
    } catch (err) {
      console.error("loadQuestion error", err);
      alert("No questions found. AI will generate new questions.");
    }
  };

  // Fetch question on filter change
  useEffect(() => {
    if (role || skill || level) {
      loadQuestion();
    } else {
      window.location.href = "/select-interview";
    }
  }, [role, skill, level]);

  function handleFinal(finalText) {
    setLiveText(finalText);
    setAnswer(finalText);
  }

  const evaluateAnswer = async () => {
    if (!answer.trim()) return;

    setLoading(true);

    try {
      const res = await axios.post(`${API}evaluate/`, {
        question,
        answer,
        session_id: sessionId.current,
      });
      setResult(res.data);
    } catch (err) {
      console.error("evaluate error", err);
      alert("Evaluation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h2
        className="
        text-4xl font-extrabold text-center mb-10
        text-[#3b82f6]
        drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]
      "
      >
        🎤 Interview ({role || "N/A"} – {skill || "N/A"} – {level || "N/A"})
      </h2>

      {/* QUESTION CARD */}
      <div
        className="
        max-w-3xl mx-auto bg-[#0d0d0d] border border-[#1f2937]
        rounded-2xl p-8 mb-10 shadow-[0_0_25px_rgba(0,0,0,0.7)]
        hover:bg-[#111] transition
      "
      >
        <h3
          className="
          text-2xl font-bold text-[#3b82f6]
          drop-shadow-[0_0_6px_rgba(59,130,246,0.7)]
        "
        >
          Interview Question
        </h3>

        <p className="text-gray-300 text-lg mt-4">{question}</p>
      </div>

      {/* RECORDER */}
      <div className="flex justify-center mb-10">
        <Recorder
          onIntermediate={(t) => setLiveText(t)}
          onFinal={handleFinal}
        />
      </div>

      {/* LIVE TRANSCRIPT */}
      <div
        className="
        max-w-3xl mx-auto bg-[#111] border border-[#1f2937]
        rounded-2xl p-5 shadow-[0_0_20px_rgba(0,0,0,0.6)]
        hover:border-[#3b82f6]
        hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]
        transition mb-6
      "
      >
        <span className="block text-[#3b82f6] font-semibold">
          Live Transcript:
        </span>
        <p className="text-gray-300 mt-2">{liveText}</p>
      </div>

      {/* ANSWER TEXTAREA */}
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="
        max-w-3xl mx-auto w-full p-4 rounded-xl bg-[#111]
        border border-[#1f2937] text-white
        focus:border-[#3b82f6]
        focus:shadow-[0_0_10px_rgba(59,130,246,0.6)]
        outline-none transition mb-6 block
      "
        rows={5}
        placeholder="Edit your final answer here..."
      />

      {/* SUBMIT BUTTON */}
      <button
        onClick={evaluateAnswer}
        className="
        max-w-3xl mx-auto block w-full p-4 rounded-xl font-bold
        bg-[#3b82f6] hover:bg-[#2563eb]
      "
      >
        {loading ? "Analyzing…" : "Submit Answer"}
      </button>

      {/* SCORECARD */}
      {result && <ScoreCard result={result} />}

      {/* NEXT QUESTION BUTTON */}
      {result && (
        <button
          onClick={() => {
            setResult(null);
            setAnswer("");
            setLiveText("");
            loadQuestion();
          }}
          className="
          max-w-3xl mx-auto block w-full p-4 mt-6 rounded-xl font-bold
          bg-green-600 hover:bg-green-700
        "
        >
          Next Question →
        </button>
      )}
    </div>
  );
}
