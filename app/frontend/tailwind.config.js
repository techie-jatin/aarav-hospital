/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        hospital: {
          green: {
            DEFAULT: '#064E3B',
            light: '#047857',
            dark: '#022C22',
          },
          emergency: {
            DEFAULT: '#DC2626',
            hover: '#B91C1C',
          },
          whatsapp: {
            DEFAULT: '#25D366',
            hover: '#16A34A',
          }
        }
      }
    },
  },
  plugins: [],
}
