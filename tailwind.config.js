/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        goldman: ["Goldman-Regular", "roboto"],
        "goldman-bold": ["Goldman-Bold", "roboto"],
        "orbitron-black": ["Orbitron-Black", "roboto"],
        orbitron: ["Orbitron-Regular", "roboto"],
        "orbitron-medium": ["Orbitron-Medium", "roboto"],
        "orbitron-semiBold": ["Orbitron-SemiBold", "roboto"],
        "orbitron-bold": ["Orbitron-Bold", "roboto"],
        "orbitron-extraBold": ["Orbitron-ExtraBold", "roboto"],
      },
      colors: {
        textLight: "hsl(0,0%,20%)",
        textDark: "hsl(260,0%,80%)",

        light: "hsl(266, 54%, 97%)",
        outlineLight: "hsl(0, 0%, 10%)",

        dark: "hsl(264, 14%, 7%)",
        outlineDark: "hsl(0, 0%, 81%)",

        tealDark: "hsl(198, 91%, 78%)",
        greenDark: "hsl(87, 85%, 69%)",
        purpleDark: "hsl(265, 100%, 81%)",
        yellowDark: "hsl(48, 97%, 70%)",
        redDark: "hsl(352, 100%, 80%)",
        mustardDark: "hsl(22, 100%, 69%)",

        tealLight: "hsl(197, 100%, 72%)",
        greenLight: "hsl(69, 100%, 72%)",
        purpleLight: "hsl(337, 100%, 72%)",
        yellowLight: "hsl(43, 100%, 72%)",
        redLight: "hsl(353, 100%, 70%)",
        mustardLight: "hsl(16, 100%, 72%)",
      },
      backgroundImage: {
        aqiGradient:
          "linear-gradient(90deg,hsl(165, 78%, 45%) 10%,hsl(50, 92%, 66%) 0 20%,hsl(24, 98%, 69%) 0 30%,hsl(355, 92%, 62%) 0 40%,hsl(270, 81%, 67%) 0 60%,hsl(353, 57%, 44%) 0)",
      },
      keyframes: {
        windmill: {
          from: {
            transform: `rotate(${0}turn)`,
          },
          to: {
            transform: `rotate(${-1}turn)`,
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
