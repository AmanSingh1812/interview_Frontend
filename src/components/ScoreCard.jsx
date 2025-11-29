export default function ScoreCard({ result }) {
  return (
    <div
      className="
        mt-10 max-w-3xl mx-auto 
        bg-[#0d0d0d] border border-[#1f2937]
        rounded-2xl p-8
        shadow-[0_0_25px_rgba(0,0,0,0.7)]
        hover:bg-[#111] transition
        text-white
      "
    >
      {/* SCORE */}
      <h3
        className="
          text-3xl font-extrabold mb-6
          text-[#3b82f6]
          drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]
        "
      >
        Score: {result.score}/10
      </h3>

      {/* STRENGTHS */}
      <div className="mt-4">
        <p
          className="
            font-bold text-[#22c55e]
            drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]
            mb-1
          "
        >
          Strengths:
        </p>
        <p className="text-gray-300 leading-relaxed">{result.strengths}</p>
      </div>

      {/* WEAKNESSES */}
      <div className="mt-6">
        <p
          className="
            font-bold text-[#ef4444]
            drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]
            mb-1
          "
        >
          Weaknesses:
        </p>
        <p className="text-gray-300 leading-relaxed">{result.weaknesses}</p>
      </div>

      {/* IMPROVED ANSWER */}
      <div className="mt-8">
        <p
          className="
            font-bold text-[#eab308]
            drop-shadow-[0_0_6px_rgba(234,179,8,0.6)]
          "
        >
          Improved Answer:
        </p>

        <p
          className="
            mt-3 p-4 rounded-xl
            bg-[#111] border border-[#1f2937]
            shadow-[0_0_15px_rgba(0,0,0,0.5)]
            hover:border-[#3b82f6]
            hover:shadow-[0_0_12px_rgba(59,130,246,0.5)]
            transition text-gray-300
            leading-relaxed
          "
        >
          {result.improved_answer}
        </p>
      </div>
    </div>
  );
}
