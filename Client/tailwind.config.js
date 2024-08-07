/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        carbon: '#0a0a0a', // Puedes ajustar el valor hexadecimal según el tono de negro que prefieras
      },
      boxShadow: {
        'custom': '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Usa el nombre de la fuente importada de Google Fonts
      },
      
    },
  },
  plugins: [],
}
