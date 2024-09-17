import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jetbrains: ["JetBrains Mono", "system-ui"],
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        primary: "#3C3D37",
        secondary: "#697565",
      },
      dropShadow: {
        "glow-yellow": [
          "0 0px 20px rgba(252, 201, 61, 0.6)",
          "0 0px 65px rgba(252, 201, 61, 0.4)",
        ],
        "glow-white": [
          "0 0px 50px rgba(255, 255, 255, 0.1)",
          "0 0px 100px rgba(255, 255, 255, 0.06)",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
