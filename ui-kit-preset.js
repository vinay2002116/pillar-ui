/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ['selector'],
  content: [
    './src/components/**/*.{ts,js,jsx,tsx}',
    './src/stories/**/*.{ts,js,jsx,tsx}',
  ],
  safelist: ['dark'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Kumbh Sans', ...defaultTheme.fontFamily.sans],
      },
      backgroundColor: {
        'light-1': 'rgb(var(--neutral-0) / <alpha-value>)',
        'light-2': 'rgb(var(--neutral-25) / <alpha-value>)',
        'light-3': 'rgb(var(--neutral-50) / <alpha-value>)',
        'light-4': 'rgb(var(--neutral-100) / <alpha-value>)',
        'primary-1': 'rgb(var(--primary-50) / <alpha-value>)',
        'primary-2': 'rgb(var(--primary-100) / <alpha-value>)',
        'primary-3': 'rgb(var(--primary-600) / <alpha-value>)',
        'secondary-1': 'rgb(var(--secondary-100) / <alpha-value>)',
        'secondary-2': 'rgb(var(--secondary-400) / <alpha-value>)',
        'dark-1': 'rgb(var(--neutral-500) / <alpha-value>)',
        'dark-2': 'rgb(var(--neutral-950) / <alpha-value>)',
        'success-1': 'rgb(var(--success-50) / <alpha-value>)',
        'success-2': 'rgb(var(--success-500) / <alpha-value>)',
        'info-1': 'rgb(var(--info-50) / <alpha-value>)',
        'info-2': 'rgb(var(--info-100) / <alpha-value>)',
        'warning-1': 'rgb(var(--warning-50) / <alpha-value>)',
        'warning-2': 'rgb(var(--warning-500) / <alpha-value>)',
        'danger-1': 'rgb(var(--danger-50) / <alpha-value>)',
        'danger-2': 'rgb(var(--danger-400) / <alpha-value>)',
      },
      borderColor: {
        'neutral-0': 'rgb(var(--neutral-0) / <alpha-value>)',
        'neutral-1': 'rgb(var(--neutral-100) / <alpha-value>)',
        'neutral-2': 'rgb(var(--neutral-200) / <alpha-value>)',
        'neutral-3': 'rgb(var(--neutral-300) / <alpha-value>)',
        'primary-1': 'rgb(var(--primary-200) / <alpha-value>)',
        'primary-2': 'rgb(var(--primary-700) / <alpha-value>)',
        'success-1': 'rgb(var(--success-200) / <alpha-value>)',
        'warning-1': 'rgb(var(--warning-200) / <alpha-value>)',
        'danger-1': 'rgb(var(--danger-200) / <alpha-value>)',
        'danger-2': 'rgb(var(--danger-500) / <alpha-value>)',
        'info-1': 'rgb(var(--info-200) / <alpha-value>)',
      },

      textColor: {
        'light-1': 'rgb(var(--neutral-950) / <alpha-value>)',
        'light-2': 'rgb(var(--neutral-700) / <alpha-value>)',
        'light-3': 'rgb(var(--neutral-500) / <alpha-value>)',
        'light-4': 'rgb(var(--neutral-400) / <alpha-value>)',
        'dark-1': 'rgb(var(--neutral-0) / <alpha-value>)',
        'dark-2': 'rgb(var(--neutral-50) / <alpha-value>)',
        'success-1': 'rgb(var(--success-500) / <alpha-value>)',
        'warning-1': 'rgb(var(--warning-500) / <alpha-value>)',
        'danger-1': 'rgb(var(--danger-500) / <alpha-value>)',
        'primary-1': 'rgb(var(--primary-700) / <alpha-value>)',
        'primary-2': 'rgb(var(--primary-600) / <alpha-value>)',
        'info-1': 'rgb(var(--info-500) / <alpha-value>)',
      },
      stroke: {
        'light-1': 'rgb(var(--neutral-700) / <alpha-value>)',
        'light-2': 'rgb(var(--neutral-300) / <alpha-value>)',
        dark: 'rgb(var(--neutral-0) / <alpha-value>)',
        success: 'rgb(var(--success-500) / <alpha-value>)',
        warning: 'rgb(var(--warning-400) / <alpha-value>)',
        danger: 'rgb(var(--danger-500) / <alpha-value>)',
        info: 'rgb(var(--info-500) / <alpha-value>)',
        brand: 'rgb(var(--primary-600) / <alpha-value>)',
      },

      ringColor: {
        'danger-1': 'rgb(var(--danger-200) / <alpha-value>)',
        'primary-1': 'rgb(var(--primary-100) / <alpha-value>)',
      },
      colors: {
        'click-p1': 'rgb(var(--primary-700))',
        'click-s1': 'rgb(var(--neutral-100))',
        'click-s2': 'rgb(var(--neutral-300))',
        'click-s3': 'rgb(var(--neutral-700))',
        'click-t1': 'rgb(var(--primary-100))',
        'hover-p1': 'rgb(var(--primary-600))',
        'hover-s1': 'rgb(var(--neutral-50))',
        'hover-s2': 'rgb(var(--neutral-200))',
        'hover-s3': 'rgb(var(--neutral-600))',
        'hover-t1': 'rgb(var(--primary-50))',
        'rest-p1': 'rgb(var(--primary-500) / <alpha-value>)',
        'rest-s1': 'rgb(var(--neutral-0))',
        'rest-s2': 'rgb(var(--neutral-100))',
        'rest-s3': 'rgb(var(--neutral-950))',
        'disabled-s1': 'rgb(var(--neutral-200))',
      },
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      boxShadow: {
        'shadow-lg':
          '0 4px 6px -2px rgba(16s, 24, 40, 0.03), 0 12px 16px -4px rgba(16, 24, 40, 0.08)',
        'input-shadow': '0px 0px 0px 4px #9E77ED3D, 0px 1px 2px 0px #1018280D',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
