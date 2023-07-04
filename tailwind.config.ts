import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        arc: "#FDFDFA",
        error: "#CB3F3F",
        errorDark: "#8A2323",
        errorLight: "#D47474",
        highlight: "#EDE67E",
        primary: {
          light: "#6A6AC6",
          base: "#8181F0",
          dark: "#4F4F96",
          trans: "rgba(133, 133, 219, 0.30)",
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
    },
  },
  plugins: [],
} satisfies Config;
