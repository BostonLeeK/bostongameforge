"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NightOwl() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Імітація завантаження гри
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center p-4">
      {loading ? (
        <div className="space-y-4 text-center">
          <h2 className="retro-text text-2xl">LOADING GAME</h2>
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-[#ff2b2b] animate-[blink_1s_0s_infinite]"></div>
            <div className="w-2 h-2 bg-[#ff2b2b] animate-[blink_1s_0.2s_infinite]"></div>
            <div className="w-2 h-2 bg-[#ff2b2b] animate-[blink_1s_0.4s_infinite]"></div>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-8">
          <h1 className="retro-text text-4xl">NIGHT OWL</h1>
          <p className="text-[#ff2b2b]">GAME DEMO COMING SOON</p>
          <button
            onClick={() => router.push("/")}
            className="arcade-button bg-[#2a2a2a] hover:bg-[#333]"
          >
            BACK TO MENU
          </button>
        </div>
      )}
    </div>
  );
}
