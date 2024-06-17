import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        radius: {
          small: "12px", 
          medium: "12px", 
          large: "12px", 
        },
        borderWidth: {
          small: "1px", 
          medium: "1px", 
          large: "1px",
        },
      },
      themes: {
        light: {
          colors: {
            background: "#f2f2f2",
            foreground: "#222831",
            primary: {
              foreground: "#f2f2f2",
              DEFAULT: "#006FEE",
            },
            default: {
              50: "#ffffff",
              100: "#fbfbfb",
              200: "#dedfdf",
              300: "#cacbcb",
              400: "#bdbebe",
              500: "#7a7e83",
              600: "#64696f",
              700: "#4e535a",
              800: "#383e46",
              900: "#222831",
              DEFAULT: "#7a7e83",
            },
          },
        },

        dark: {
          colors: {
            background: "#222831",
            foreground: "#EEEEEE",
            primary: {
              foreground: "#EEEEEE",
              DEFAULT: "#006FEE",
            },
            default: {
              50: "#222831",
              100: "#383e46",
              200: "#4e535a",
              300: "#64696f",
              400: "#7a7e83",
              500: "#bdbebe",
              600: "#cacbcb",
              700: "#dedfdf",
              800: "#f2f2f2",
              900: "#f8f9f9",
              DEFAULT: "#bdbebe",
            },
          },
        },
      },
    }),
  ],
};
