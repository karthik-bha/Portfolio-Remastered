/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "postcss-import": {}, // Ensures Tailwind is processed correctly
    tailwindcss: {},
    autoprefixer: {}, // Helps with browser compatibility
  },
};

export default config;
