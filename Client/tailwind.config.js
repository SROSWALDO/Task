/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: '#0a0a0a', // Puedes ajustar el valor hexadecimal según el tono de negro que prefieras
      },
    },
  },
  plugins: [],
}
