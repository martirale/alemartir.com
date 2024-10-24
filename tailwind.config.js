/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: "#ffff00",
        black: "#000000",
      },
    },
    extend: {
      fontSize: {
        base: "18px",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
