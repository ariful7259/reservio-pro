import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#2e3f6e',
          hover: '#243253',
          light: '#eef2ff',
          foreground: '#ffffff'
        },
        secondary: {
          DEFAULT: '#35aa47',
          hover: '#2d8f3c',
          light: '#ebf9ed',
          foreground: '#ffffff'
        },
        accent: {
          DEFAULT: '#4c9ac0',
          hover: '#3d7b9a',
          light: '#edf7fb',
          foreground: '#ffffff'
        },
        destructive: {
          DEFAULT: '#ff4444',
          foreground: '#ffffff'
        },
        muted: {
          DEFAULT: '#f7f7f7',
          foreground: '#666666'
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#333333'
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#333333'
        },
        nb: {
          link: '#4c9ac0',
          text: {
            primary: '#333333',
            secondary: '#666666',
            light: '#999999'
          },
          border: '#e0e0e0',
          background: {
            light: '#f7f7f7',
            white: '#ffffff'
          },
          success: '#35aa47',
          warning: '#f39c12',
          error: '#ff4444'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
