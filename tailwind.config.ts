import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      backgroundImage: {
        'pixel-pattern': 'radial-gradient(#ff2b2b 1px, transparent 1px)',
        'arcade-grid': 'linear-gradient(to right, #ff2b2b 1px, transparent 1px), linear-gradient(to bottom, #ff2b2b 1px, transparent 1px)',
      },
      boxShadow: {
        'retro': '4px 4px 0px #ff2b2b',
        'retro-lg': '8px 8px 0px #1a1a1a',
      },
    },
  },
  plugins: [],
};

export default config;