/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/collections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/globals/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12)/,
    },
  ],
  theme: {
    extend: {
      maxWidth: {
        container: '1400px',
      },
      colors: {
        'ds-dark-blue': '#3d426a', // CMYK: 85/75/32/20 | RGB: 61/66/106
        'ds-pastille-green': '#547b82', // CMYK: 68/36/39/18 | RGB: 84/123/130
        'ds-accent-yellow': '#faa636', // CMYK: 0/42/84/0 | RGB: 250/166/54
        'ds-light-neutral': '#efefee', // CMYK: 7/5/7/0 | RGB: 239/239/238
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        heading: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        semibold: '600',
      },
      animation: {
        'fade-in-down': 'fadeInDown 0.2s ease-out',
        'fade-out-up': 'fadeOutUp 0.15s ease-in',
        'slide-in': 'slideIn 0.2s ease-out',
        'slide-out': 'slideOut 0.15s ease-in',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOutUp: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'scaleY(0.95)' },
          '100%': { opacity: '1', transform: 'scaleY(1)' },
        },
        slideOut: {
          '0%': { opacity: '1', transform: 'scaleY(1)' },
          '100%': { opacity: '0', transform: 'scaleY(0.95)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
