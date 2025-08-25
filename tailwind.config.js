/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "genos-thin": ["genos-thin", "roboto"],
        "genos-extraLight": ["genos-extraLight", "roboto"],
        "genos-light": ["genos-light", "roboto"],
        "genos-regular": ["genos-regular", "roboto"],
        "genos-medium": ["genos-medium", "roboto"],
        "genos-semiBold": ["genos-semiBold", "roboto"],
        "genos-bold": ["genos-bold", "roboto"],
        "genos-extraBold": ["genos-extraBold", "roboto"],
        "genos-black": ["genos-black", "roboto"],

        "orbitron-regular": ["orbitron-regular", "roboto"],
        "orbitron-medium": ["orbitron-medium", "roboto"],
        "orbitron-semiBold": ["orbitron-semiBold", "roboto"],
        "orbitron-bold": ["orbitron-bold", "roboto"],
        "orbitron-extraBold": ["orbitron-extraBold", "roboto"],
        "orbitron-black": ["orbitron-black", "roboto"],
      },
      colors: {
        light: "hsl(266, 54%, 97%)",
        outlineLight: "hsl(0, 0%, 10%)",

        dark: "hsl(264, 14%, 7%)",
        outlineDark: "hsl(0, 0%, 81%)",

        tealDark: "hsl(197, 80%, 72%)",
        greenDark: "hsl(69, 80%, 72%)",
        purpleDark: "hsl(265, 80%, 72%)",
        mustardDark: "hsl(16, 80%, 72%)",
        yellowDark: "hsl(43, 80%, 72%)",
        redDark: "hsl(353, 80%, 72%)",

        tealLight: "hsl(197, 100%, 72%)",
        greenLight: "hsl(69, 100%, 72%)",
        purpleLight: "hsl(265, 100%, 72%)",
        mustardLight: "hsl(16, 100%, 72%)",
        yellowLight: "hsl(43, 100%, 72%)",
        redLight: "hsl(353, 100%, 72%)",
      },
      backgroundImage: {
        aqiGradient:
          "linear-gradient(90deg,hsl(165, 78%, 45%) 10%,hsl(50, 92%, 66%) 0 20%,hsl(24, 98%, 69%) 0 30%,hsl(355, 92%, 62%) 0 40%,hsl(270, 81%, 67%) 0 60%,hsl(353, 57%, 44%) 0)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
