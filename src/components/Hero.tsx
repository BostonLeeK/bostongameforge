"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Hero() {
  const router = useRouter();
  const [credits, setCredits] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  const [canPlay, setCanPlay] = useState(false);

  // Імітація вставки монети через пробіл
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        insertCoin();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  // Блимання тексту
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Автоматичне очищення повідомлень
  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => setShowMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  // Оновлення стану canPlay при зміні кредитів
  useEffect(() => {
    setCanPlay(credits > 0);
  }, [credits]);

  const insertCoin = () => {
    setCredits((prev) => prev + 1);
    setShowMessage("CREDIT ADDED!");

    // Звук вставки монети
    const audio = new Audio("/sounds/coin.mp3");
    audio.play().catch(() => {}); // Ігноруємо помилку, якщо звук не завантажився
  };

  const handlePlay = () => {
    if (!canPlay) {
      setShowMessage("INSERT COIN TO PLAY!");
      return;
    }
    setCredits((prev) => prev - 1);
    router.push("/games/night-owl");
  };

  const handleHighScores = () => {
    // Для перегляду рекордів кредити не потрібні
    router.push("/high-scores");
  };

  return (
    <section className="relative h-screen flex items-center justify-center arcade-frame">
      {/* Retro background */}
      <div className="absolute inset-0 pixel-bg opacity-20" />

      {/* Message popup */}
      {showMessage && (
        <div
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-30 
                    bg-[#1a1a1a] border-2 border-[#ff2b2b] p-4 text-[#ff2b2b]
                    animate-[fadeIn_0.3s_ease-in-out]"
        >
          {showMessage}
        </div>
      )}

      <div className="container mx-auto px-4 relative z-20 text-center">
        {/* Game title area */}
        <div className="mb-16 space-y-6">
          <h1 className="retro-text text-6xl">
            BOSTON
            <br />
            GAME FORGE
          </h1>
          <p className="retro-text-sm text-xl text-[#ff2b2b]">
            {canPlay ? "READY TO PLAY!" : "PRESS SPACE TO INSERT COIN"}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-8 justify-center">
          <button
            onClick={handlePlay}
            className={`arcade-button ${
              canPlay
                ? "bg-[#ff2b2b] hover:bg-[#ff4444]"
                : "bg-[#666] cursor-not-allowed"
            }`}
          >
            PLAY DEMO
          </button>
          <button
            onClick={handleHighScores}
            className="arcade-button bg-[#2a2a2a] hover:bg-[#333]"
          >
            HIGH SCORES
          </button>
        </div>
      </div>

      {/* Arcade cabinet elements */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button
          onClick={insertCoin}
          className="px-4 py-2 bg-[#2a2a2a] rounded text-sm hover:bg-[#333] active:transform active:translate-y-0.5"
        >
          INSERT COIN
        </button>
        <span
          className={`text-[#ff2b2b] text-sm ${
            isBlinking ? "opacity-0" : "opacity-100"
          } transition-opacity`}
        >
          CREDITS: {credits.toString().padStart(2, "0")}
        </span>
      </div>

      {/* Help text */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-xs text-[#666]">
        Press SPACE to insert coin
      </div>

      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-[#ff2b2b]" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-[#ff2b2b]" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-[#ff2b2b]" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-[#ff2b2b]" />
    </section>
  );
}
