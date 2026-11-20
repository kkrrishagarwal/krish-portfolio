import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          green: "#39FF14",
          blue: "#00FFFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        "neon-green": "0 0 8px rgba(57,255,20,0.6), 0 0 24px rgba(57,255,20,0.25)",
        "neon-blue": "0 0 8px rgba(0,255,255,0.6), 0 0 24px rgba(0,255,255,0.25)",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "border-spin": {
          to: { transform: "translate(-50%,-50%) rotate(360deg)" },
          from: { transform: "translate(-50%,-50%) rotate(0deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "glitch-1": {
          "0%, 86%, 100%": { opacity: "0", transform: "translate(0)", clipPath: "inset(0 0 0 0)" },
          "87%": { opacity: "1", transform: "translate(-4px, 2px)", clipPath: "inset(10% 0 60% 0)" },
          "90%": { opacity: "1", transform: "translate(4px, -2px)", clipPath: "inset(55% 0 20% 0)" },
          "93%": { opacity: "1", transform: "translate(-2px, 1px)", clipPath: "inset(30% 0 40% 0)" },
        },
        "glitch-2": {
          "0%, 88%, 100%": { opacity: "0", transform: "translate(0)", clipPath: "inset(0 0 0 0)" },
          "89%": { opacity: "1", transform: "translate(4px, -1px)", clipPath: "inset(70% 0 5% 0)" },
          "92%": { opacity: "1", transform: "translate(-4px, 2px)", clipPath: "inset(5% 0 75% 0)" },
          "95%": { opacity: "1", transform: "translate(2px, 0)", clipPath: "inset(40% 0 35% 0)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "glitch-1": "glitch-1 5s steps(1) infinite 3s",
        "glitch-2": "glitch-2 5s steps(1) infinite 3s",
        scan: "scan 8s linear infinite",
        blink: "blink 1s step-end infinite",
        "border-spin": "border-spin 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
