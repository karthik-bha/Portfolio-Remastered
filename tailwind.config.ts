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
      colors: {
        "secondary": "#121212",
        "primary": "#0a0a0a",
        "txt-color-1": "#ffffff",
        "txt-color-2": "#848484"
      },
      fontSize: {
        "nav-header": "1.7rem",
        "section-header": "2rem",
        "content": "1.2rem",
        "sub-heading": "1.3rem",
      },
      fontFamily: {
        header: ["var(--font-montserrat)", "system-ui", "serif"],
        content: ["var(--font-inter)", "system-ui", "serif"],
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
