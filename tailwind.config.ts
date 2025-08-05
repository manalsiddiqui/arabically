import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'arabic': ['Noto Sans Arabic', 'Arial', 'sans-serif'],
        'en': ['Inter', 'system-ui', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Desert-inspired primary colors (warm browns from logo)
        primary: {
          50: '#faf8f5',   // Very light cream
          100: '#f5f0e8',  // Light cream
          200: '#ede1d0',  // Soft beige
          300: '#e0ccb0',  // Light brown
          400: '#d4b08a',  // Medium brown
          500: '#c8956d',  // Main desert brown (from logo)
          600: '#b8804f',  // Deep brown
          700: '#9a6b42',  // Darker brown
          800: '#7f5739',  // Dark brown
          900: '#6b4730',  // Very dark brown
        },
        // Green accents (from the tree in logo)
        accent: {
          50: '#f0fdf4',   // Very light green
          100: '#dcfce7',  // Light green
          200: '#bbf7d0',  // Soft green
          300: '#86efac',  // Medium green
          400: '#4ade80',  // Fresh green
          500: '#22c55e',  // Main green (tree color)
          600: '#16a34a',  // Deep green
          700: '#15803d',  // Darker green
          800: '#166534',  // Dark green
          900: '#14532d',  // Very dark green
        },
        // Desert sand/beige tones
        secondary: {
          50: '#fdfcf9',   // Very light sand
          100: '#faf7f0',  // Light sand
          200: '#f4ede1',  // Soft sand
          300: '#ebe0cf',  // Medium sand
          400: '#dccfb8',  // Warm sand
          500: '#c9b899',  // Main sand (background tone from logo)
          600: '#b5a082',  // Deep sand
          700: '#9a886d',  // Darker sand
          800: '#807159',  // Dark sand
          900: '#6b5e4a',  // Very dark sand
        },
        // Warm earth tones (darker browns from logo)
        earth: {
          50: '#faf9f7',   // Very light earth
          100: '#f3f0eb',  // Light earth
          200: '#e8e0d6',  // Soft earth
          300: '#d7c8b8',  // Medium earth
          400: '#c0a896',  // Warm earth
          500: '#a68b73',  // Main earth brown
          600: '#8f7660',  // Deep earth
          700: '#7a6350',  // Darker earth
          800: '#665344',  // Dark earth
          900: '#56453a',  // Very dark earth
        },
        // Neutral grays with warm undertones
        neutral: {
          50: '#fafaf9',   // Warm white
          100: '#f5f5f4',  // Light warm gray
          200: '#e7e5e4',  // Soft warm gray
          300: '#d6d3d1',  // Medium warm gray
          400: '#a8a29e',  // Gray
          500: '#78716c',  // Main gray
          600: '#57534e',  // Deep gray
          700: '#44403c',  // Darker gray
          800: '#292524',  // Dark gray
          900: '#1c1917',  // Very dark gray
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-desert': 'linear-gradient(135deg, #c8956d 0%, #a68b73 25%, #22c55e 75%, #16a34a 100%)',
        'gradient-sand': 'linear-gradient(135deg, #c9b899 0%, #b5a082 100%)',
        'gradient-earth': 'linear-gradient(135deg, #a68b73 0%, #8f7660 100%)',
        'gradient-green': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-out',
        'slideInLeft': 'slideInLeft 0.6s ease-out',
        'slideInRight': 'slideInRight 0.6s ease-out',
        'scaleIn': 'scaleIn 0.4s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gradient': 'gradient-shift 3s ease infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        slideInLeft: {
          'from': { opacity: '0', transform: 'translateX(-20px)' },
          'to': { opacity: '1', transform: 'translateX(0)' }
        },
        slideInRight: {
          'from': { opacity: '0', transform: 'translateX(20px)' },
          'to': { opacity: '1', transform: 'translateX(0)' }
        },
        scaleIn: {
          'from': { opacity: '0', transform: 'scale(0.95)' },
          'to': { opacity: '1', transform: 'scale(1)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(34, 197, 94, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(34, 197, 94, 0.8), 0 0 30px rgba(34, 197, 94, 0.4)' }
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
  safelist: [
    'focus:ring-primary-500',
    'focus:border-primary-500',
    'focus:ring-accent-500',
    'focus:border-accent-500',
    'focus:ring-2',
    'focus:ring-offset-2',
    'hover:bg-primary-700',
    'hover:from-primary-700',
    'hover:to-accent-700',
    'bg-gradient-desert',
    'bg-gradient-sand',
    'bg-gradient-earth',
    'bg-gradient-green',
  ]
}

export default config 