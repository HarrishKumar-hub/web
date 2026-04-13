import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C41E3A',
        secondary: '#FFD700',
        dark: '#1F2937',
        light: '#F9FAFB',
      },
    },
  },
  plugins: [],
}
export default config
