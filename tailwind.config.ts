import type { Config } from 'tailwindcss'

export const gray = {
  DEFAULT: '#FFFFFF',
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // STRICT MONOCHROME SYSTEM - 1stPodium
        black: {
          DEFAULT: '#000000',
          50: '#050505',
          100: '#070707',
          200: '#0D0D0D',
          300: '#111111',
          400: '#181818',
          500: '#242424',
          600: '#3A3A3A',
        },
        grey: {
          100: '#707070',
          200: '#A0A0A0',
          300: '#D6D6D6',
          400: '#F2F2F2',
        },
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(64px, 8vw, 128px)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'hero-sm': ['clamp(48px, 7vw, 96px)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display': ['clamp(48px, 6vw, 96px)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'title': ['clamp(30px, 3.2vw, 54px)', { lineHeight: '1.04', letterSpacing: '-0.015em' }],
        'subhead': ['clamp(20px, 2.4vw, 30px)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'body-lg': ['clamp(18px, 2vw, 20px)', { lineHeight: '1.6' }],
        'body': ['clamp(15px, 1.6vw, 17px)', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'small': ['0.8125rem', { lineHeight: '1.6' }],
        'micro': ['0.7rem', { lineHeight: '1.5', letterSpacing: '0.14em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      maxWidth: {
        content: '1440px',
      },
    },
  },
  plugins: [],
}
export default config