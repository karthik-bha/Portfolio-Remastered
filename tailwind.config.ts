import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {},
      fontSize: {
        "nav-header": "1.7rem",
        "section-header": "2rem",
        "content": "1.2rem",
        "sub-heading": "1.3rem",
      },
      fontFamily: {
        header: ["Montserrat", "serif"],
        content: ["Inter", "serif"],
      },
    },
  },
  safelist: [
    "animate-fade-right",
    "animate-fade-left",
    "animate-fade-up",
    "animate-fade-down",
    "animate-fade",
    "animate-slide-in", 
  ],
  plugins: [require("tailwindcss-animated")],
} satisfies Config;
