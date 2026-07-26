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
        // Core Temple Design System Palette
        stone: {
          950: '#12100D',
          900: '#181612', // Base stone (#181612)
          800: '#23201A', // Surface (#23201A)
          700: '#2D291F', // Elevated Surface (#2D291F)
          600: '#3F392C',
          500: '#544D3C',
          400: '#756D58',
          300: '#9E947A',
          200: '#C8B79A', // Secondary Text (#C8B79A)
          100: '#F3EBDD', // Primary Text / Sand (#F3EBDD)
          50:  '#FCFAF6',
        },
        surface: {
          DEFAULT: '#23201A',
          elevated: '#2D291F',
          base: '#181612',
          border: 'rgba(243, 235, 221, 0.10)',
        },
        brass: {
          100: '#F5E6C8',
          200: '#E6C98E',
          300: '#D2B060', // Hover accent
          400: '#B08A4F', // Primary Accent (#B08A4F)
          500: '#8C6B35', // Active accent
          600: '#6E5229',
          DEFAULT: '#B08A4F',
        },
        sacred: {
          100: '#F7D3BA',
          200: '#E8A374',
          300: '#D98448',
          400: '#C46A2B', // Sacred Accent (#C46A2B)
          500: '#99501E',
          600: '#733B14',
          DEFAULT: '#C46A2B',
          smoke: '#9E947A',
          ash: '#181612',
          deep: '#12100D',
        },
        temple: {
          red: '#7A2E21', // Temple Red (#7A2E21)
          success: '#66735C', // Success (#66735C)
          divider: 'rgba(243, 235, 221, 0.10)',
        },
        // Legacy aliases retained for backwards compatibility during transition
        gold: {
          pale:     '#F3EBDD',
          light:    '#D2B060',
          DEFAULT:  '#B08A4F',
          dark:     '#B08A4F',
          metallic: '#8C6B35',
        },
        saffron: {
          light:   '#D98448',
          DEFAULT: '#C46A2B',
          dark:    '#99501E',
          glow:    '#C46A2B',
        },
        maroon: {
          light:   'rgba(122, 46, 33, 0.20)',
          DEFAULT: '#7A2E21',
          dark:    '#5C2218',
          deep:    '#3B140E',
        },
        ivory: {
          DEFAULT: '#F3EBDD',
          warm:    '#EADDC7',
          cream:   '#DFCEB2',
        },
        indigo: {
          light:   '#756D58',
          DEFAULT: '#2D291F',
          dark:    '#181612',
        },
        white: '#FFFFFF',
        premium: {
          bg:     '#181612',
          accent: '#B08A4F',
          text:   '#F3EBDD',
        },
      },
      fontFamily: {
        serif:  ['var(--font-cormorant)', 'var(--font-tamil)', 'Georgia', 'serif'],
        lora:   ['var(--font-cormorant)', 'var(--font-tamil)', 'Georgia', 'serif'],
        sans:   ['var(--font-inter)', 'var(--font-tamil)', 'system-ui', 'sans-serif'],
        tamil:  ['var(--font-tamil)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'golden':    '0 16px 38px -18px rgba(176, 138, 79, 0.22)',
        'golden-lg': '0 28px 64px -24px rgba(176, 138, 79, 0.28)',
        'temple':    '0 20px 48px -18px rgba(0, 0, 0, 0.55)',
        'flame':     '0 12px 32px -14px rgba(196, 106, 43, 0.28)',
        'plaque':    '0 14px 32px -12px rgba(0, 0, 0, 0.65)',
      },
      backgroundImage: {
        'temple-footer': 'linear-gradient(180deg, #181612 0%, #23201A 100%)',
        'gold-shine':    'linear-gradient(135deg, #8C6B35 0%, #B08A4F 35%, #D2B060 55%, #B08A4F 80%, #8C6B35 100%)',
        'saffron-glow':  'linear-gradient(135deg, #7A2E21 0%, #C46A2B 50%, #D2B060 100%)',
        'stone-panel':   'linear-gradient(180deg, #23201A 0%, #181612 100%)',
        'ivory-fade':    'linear-gradient(180deg, #23201A 0%, #181612 100%)',
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
        'sacred': '0.35em',
        'divine': '0.25em',
      },
    },
  },
  plugins: [],
}
export default config
