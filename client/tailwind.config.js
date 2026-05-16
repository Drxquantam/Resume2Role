/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#07111f",
        glass: "rgba(255, 255, 255, 0.08)",
        electric: "#38bdf8",
        mint: "#34d399",
        amberSoft: "#fbbf24"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(56, 189, 248, 0.18)",
        card: "0 20px 60px rgba(0, 0, 0, 0.28)"
      },
      backgroundImage: {
        "app-gradient": "radial-gradient(circle at top left, rgba(56, 189, 248, 0.24), transparent 34%), radial-gradient(circle at 85% 20%, rgba(52, 211, 153, 0.18), transparent 30%), linear-gradient(135deg, #07111f 0%, #101827 52%, #0b1320 100%)"
      }
    }
  },
  plugins: []
};
