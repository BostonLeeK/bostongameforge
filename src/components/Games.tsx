"use client";

import { useRouter } from "next/navigation";

export default function Games() {
  const router = useRouter();

  const games = [
    {
      title: "NIGHT OWL",
      description:
        "A psychological VR horror-thriller that blends action and mind-bending puzzles. Navigate through a mysterious small town where an ancient evil takes form of a demonic owl.",
      status: "IN DEVELOPMENT",
      tech: ["UNITY", "VR"],
      features: ["VR HORROR", "PUZZLES", "STEALTH"],
      image: "/games/night-owl.png",
      demoPath: "/games/night-owl",
    },
  ];

  const handlePlayDemo = (demoPath: string) => {
    router.push(demoPath);
  };

  return (
    <section className="relative py-20 bg-[#1a1a1a] text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ff2b2b_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2
            className="inline-block relative px-12 py-4 text-5xl font-black tracking-wider"
            style={{
              textShadow: `
              3px 3px 0px #ff2b2b,
              6px 6px 0px #1a1a1a
            `,
            }}
          >
            OUR GAMES
          </h2>
        </div>

        {/* Games grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <div
              key={index}
              className="group relative bg-[#2a2a2a] rounded-lg overflow-hidden transform transition-transform hover:scale-105"
            >
              {/* Game card header */}
              <div className="relative h-48 bg-black overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2a2a2a] to-transparent" />
              </div>

              <div className="p-6">
                {/* Title with retro style */}
                <h3
                  className="text-2xl font-bold mb-4 text-[#ff2b2b]"
                  style={{
                    textShadow: "2px 2px 0px #1a1a1a",
                  }}
                >
                  {game.title}
                </h3>

                <p className="text-gray-300 mb-6 font-medium">
                  {game.description}
                </p>

                {/* Tech badges */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {game.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs bg-[#1a1a1a] text-[#ff2b2b] px-3 py-1 rounded font-bold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Feature list */}
                  <div className="flex flex-wrap gap-2">
                    {game.features.map((feature, i) => (
                      <span
                        key={i}
                        className="text-xs bg-[#333] px-3 py-1 rounded font-bold"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status and action buttons */}
                <div className="mt-6 flex flex-col gap-4">
                  <span className="inline-block bg-[#ff2b2b] px-4 py-2 rounded text-sm font-bold text-center">
                    {game.status}
                  </span>
                  <button
                    onClick={() => handlePlayDemo(game.demoPath)}
                    className="group relative px-4 py-2 bg-[#2a2a2a] hover:bg-[#333] rounded font-bold transition-colors"
                  >
                    PLAY DEMO →
                  </button>
                </div>
              </div>

              {/* Decorative pixel corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ff2b2b]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#ff2b2b]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#ff2b2b]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#ff2b2b]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
