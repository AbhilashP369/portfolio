import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        deep: "var(--bg-deep)",
        panel: "var(--bg-panel)",
        raised: "var(--bg-raised)",
        border: "var(--border)",
        "border-lit": "var(--border-lit)",
        amber: "var(--amber)",
        "amber-dim": "var(--amber-dim)",
        "green-tc": "var(--green-tc)",
        primary: "var(--text-primary)",
        muted: "var(--text-muted)",
        dim: "var(--text-dim)",
      },
      fontFamily: {
        mono: ['var(--font-jetbrains)', 'monospace'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        bebas: ['var(--font-bebas)', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'ken-burns': 'kenBurns 10s ease-in-out infinite alternate',
      },
      keyframes: {
        kenBurns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.025)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
