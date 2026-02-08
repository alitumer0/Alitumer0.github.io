import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-heading)", "sans-serif"],
        serif: ["var(--font-body)", "serif"],
        mono: ["var(--font-geist-mono)", "monospace"]
      },
      colors: {
        night: "#020202",
        frost: "#f0f0f0"
      },
      boxShadow: {
        glass: "0 18px 54px rgba(3, 15, 28, 0.48)"
      },
      backdropBlur: {
        xl: "22px"
      }
    }
  },
  plugins: []
};

export default config;
