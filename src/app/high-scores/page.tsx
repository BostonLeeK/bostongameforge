"use client";

import { useRouter } from "next/navigation";

export default function HighScores() {
  const router = useRouter();
  const scores = [
    { name: "DEV", score: 100000 },
    { name: "BGF", score: 50000 },
    { name: "OWL", score: 25000 },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <h1 className="retro-text text-4xl text-center mb-12">HIGH SCORES</h1>

        <div className="space-y-4">
          {scores.map((score, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-[#2a2a2a] p-4 border-l-4 border-[#ff2b2b]"
            >
              <span className="text-[#ff2b2b]">{score.name}</span>
              <span>{score.score.toLocaleString()}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/")}
          className="arcade-button bg-[#2a2a2a] hover:bg-[#333] w-full mt-8"
        >
          BACK TO MENU
        </button>
      </div>
    </div>
  );
}
