import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core Gold Palette
        gold: {
          pale:     '#FDF6E3',
          light:    '#F4CE6A',
          DEFAULT:  '#D4AF37',
          dark:     '#996515',
          metallic: '#C5A028',
        },
        // Saffron — primary CTA & highlight colour
        saffron: {
          light:   '#F5A761',
          DEFAULT: '#E8722A',
          dark:    '#C25A18',
        },
        // Maroon — footer, accents, borders
        maroon: {
          light:   '#A3303030',
          DEFAULT: '#7B1C1C',
          dark:    '#4A0E0E',
          deep:    '#1E0505',
        },
        // Ivory — warm page backgrounds
        ivory: {
          DEFAULT: '#FAF7F0',
          warm:    '#F5EFE0',
          cream:   '#EDE4CC',
        },
        // Sacred text neutrals
        sacred: {
          smoke: '#6B5744',
          ash:   '#3D2B1F',
          deep:  '#1A0E08',
        },
        // Indigo — contrast sections
        indigo: {
          light:   '#7B6FA3',
          DEFAULT: '#3D3268',
          dark:    '#1a0a2e',
        },
        // Legacy white compatibility
        white: '#FFFFFF',
        premium: {
          bg:     '#FAF7F0',
          accent: '#D4AF37',
          text:   '#996515',
        },
      },
      fontFamily: {
        serif:  ['var(--font-cinzel)', 'var(--font-lora)', 'serif'],
        lora:   ['var(--font-lora)', 'serif'],
        sans:   ['var(--font-dm-sans)', 'var(--font-sans)', 'sans-serif'],
      },
      boxShadow: {
        'golden':    '0 20px 50px -15px rgba(212, 175, 55, 0.18)',
        'golden-lg': '0 30px 80px -20px rgba(153, 101, 21, 0.22)',
        'temple':    '0 25px 60px -10px rgba(123, 28, 28, 0.18)',
        'flame':     '0 15px 40px -10px rgba(232, 114, 42, 0.35)',
        'ivory':     '0 8px 30px -8px rgba(61, 43, 31, 0.08)',
      },
      backgroundImage: {
        'temple-footer': 'linear-gradient(160deg, #4A0E0E 0%, #7B1C1C 40%, #1a0a2e 100%)',
        'gold-shine':    'linear-gradient(135deg, #996515 0%, #D4AF37 25%, #F4CE6A 50%, #D4AF37 75%, #996515 100%)',
        'saffron-glow':  'linear-gradient(135deg, #C25A18 0%, #E8722A 50%, #F5A761 100%)',
        'ivory-fade':    'linear-gradient(180deg, #FAF7F0 0%, #F5EFE0 100%)',
      },
      animation: {
        'divine-flicker': 'flicker 3s infinite ease-in-out',
        'lamp-flicker':   'lampFlicker 2.5s infinite ease-in-out',
        'float-gentle':   'floatGentle 6s infinite ease-in-out',
        'shimmer':        'shimmer 2s infinite linear',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '0.8' },
          '50%':      { opacity: '1' },
        },
        lampFlicker: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '33%':      { opacity: '1',   transform: 'scale(1.05)' },
          '66%':      { opacity: '0.85', transform: 'scale(0.98)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      letterSpacing: {
        'sacred': '0.5em',
        'divine': '0.3em',
      },
    },
  },
  plugins: [],
}
export default config
