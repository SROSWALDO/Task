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
      borderWidth: {
        'gradient': '2px',
      },
      borderColor: {
        'gradient-dark': 'linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6)',
      },
      
    },
  },
  plugins: [
    function ({ addUtilities, e, theme, variants }) {
      const borderGradients = theme('borderColor');
      const borderGradientUtilities = Object.keys(borderGradients).reduce((acc, key) => {
        acc[`.${e(`border-gradient-${key}`)}::before`] = {
          content: '""',
          display: 'block',
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          border: '2px solid transparent',
          borderRadius: 'inherit',
          background: `linear-gradient(${borderGradients[key]})`,
        };
        return acc;
      }, {});

      addUtilities(borderGradientUtilities, variants('borderColor'));
    },
  ],
}
