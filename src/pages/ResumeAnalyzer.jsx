import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitResume = async () => {
    if (!file) return alert("Please upload a resume");

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_description", jobDesc); // optional now

    setLoading(true);

    try {
      const res = await axios.post(
        "https://unencroached-kori-debasingly.ngrok-free.dev/api/analyze_resume/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  function startInterview() {
    const role = result.best_fit_role || "";
    const skills = result.top_skills?.split(",")[0] || ""; // pick first skill

    navigate(`/interview?role=${role}&skill=${skills}&level=medium`);
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-[#3b82f6]">
        📄 Resume Analyzer
      </h1>

      <div className="max-w-xl mx-auto bg-[#0d0d0d] border border-[#1f2937] rounded-2xl p-8">
        {/* FILE INPUT */}
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full mb-6 bg-[#111] p-3 rounded-xl border border-[#1f2937]"
        />

        {/* Optional JOB DESCRIPTION */}
        <textarea
          placeholder="Paste Job Description (optional)"
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          className="w-full p-4 rounded-xl bg-[#111] text-white border border-[#1f2937] mb-6"
          rows={5}
        />

        <button
          onClick={submitResume}
          className="w-full p-3 rounded-xl font-semibold bg-[#3b82f6]"
        >
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>

        {result && (
          <div className="mt-8 p-6 rounded-2xl bg-[#111] border border-[#1f2937]">
            <h2 className="text-2xl font-bold text-[#3b82f6]">
              Analysis Result
            </h2>

            <p className="text-gray-300 mt-3">
              <b>ATS Score:</b> {result.ats_score}
            </p>

            <p className="text-gray-300 mt-3">
              <b>Best Fit Role:</b> {result.best_fit_role}
            </p>

            <p className="text-gray-300 mt-3">
              <b>Top Skills:</b> {result.top_skills}
            </p>

            <p className="text-gray-300 mt-3">
              <b>Strengths:</b> {result.strengths}
            </p>

            <p className="text-gray-300 mt-3">
              <b>Weaknesses:</b> {result.weaknesses}
            </p>

            <button
              onClick={startInterview}
              className="w-full mt-6 p-3 rounded-xl bg-green-600 hover:bg-green-700"
            >
              Start Interview Based on Resume →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
