import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#FDFDFA",
        error: "#CB3F3F",
        highlight: "#EDE67E",
        primary: {
          1: "#6A6AC6",
          2: "#8181F0",
          3: "#4F4F96",
        },
        secondary: {
          1: "#4CD0E4",
          2: "#93E2EE",
          3: "#358B98",
        },
        tertiary: {
          1: "#F16889",
          2: "#FF84A1",
          3: "#CE5673",
        },
        contrast: {
          1: "#333",
          2: "#595959",
          3: "#818181",
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
