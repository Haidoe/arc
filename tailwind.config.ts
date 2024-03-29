import { type Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundArc: "#E3E3E3",
        // ? change to foregroundArc
        arc: "#FDFDFA",
        error: "#CB3F3F",
        errorDark: "#8A2323",
        errorLight: "#D47474",
        highlight: "#EDE67E",
        hyperlink: "#3178F1",
        primary: {
          light: "#6A6AC6",
          base: "#8181F0",
          dark: "#4F4F96",
          trans: "rgba(133, 133, 219, 0.15)",
        },
        secondary: {
          light: "#4CD0E4",
          base: "#93E2EE",
          dark: "#358B98",
        },
        tertiary: {
          light: "#F16889",
          base: "#FF84A1",
          dark: "#CE5673",
        },
        contrast: {
          lighter: "#DADADA",
          light: "#AAAAAA",
          base: "#2B2B2B",
          dark: "#565656",
        },
      },
      fontSize: {
        sm: "14px",
        base: "1rem",
        lg: "1.25rem",
        xl: "1.5rem",
        "2xl": "1.9375rem",
        "3xl": "2.4375rem",
        "4xl": "3rem",
      },
      boxShadow: {
        "3xl": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        "3xl-lighter": "0px 4px 4px 0px rgba(0, 0, 0, 0.05)",
      },
    },
    screens: {
      xs: "391px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
} satisfies Config;
