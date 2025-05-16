// tailwind.config.js  ✅ valid
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
      },
      keyframes: {
  floatIn: {
          '0%':   { opacity: 0, transform: 'translateY(60px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        floatIn: 'floatIn 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
};

