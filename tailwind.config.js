/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: "oklch(0.9744 0.0098 305.41)",
        outlineLight: "oklch(0.2156 0 0)",

        dark: "oklch(0.1736 0.0098 305.41)",
        outlineDark: "oklch(0.8501 0 0)",

        tealDark: "oklch(0.8559 0.0822 227.57)",
        greenDark: "oklch(0.8951 0.1777 129.57)",
        purpleDark: "oklch(0.7774 0.1378 302.7)",
        yellowDark: "oklch(0.904 0.1415 94.8)",
        redDark: "oklch(0.7915 0.1226 12.29)",
        mustardDark: "oklch(0.7815 0.1406 49.72)",

        tealLight: "oklch(0.83 0.111 226.72)",
        greenLight: "oklch(0.9564 0.1684 117.01)",
        purpleLight: "oklch(0.7324 0.1814 358.91)",
        yellowLight: "oklch(0.8912 0.129 87.74)",
        redLight: "oklch(0.7082 0.1862 15.82)",
        mustardLight: "oklch(0.7771 0.1361 41.12)",
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
