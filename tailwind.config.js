/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/logos/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      yellow: "#ffff00",
      black: "#000000",
    },
    extend: {
      fontSize: {
        base: "18px",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
