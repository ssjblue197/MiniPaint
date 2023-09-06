// eslint-disable-next-line no-undef
const colors = require('tailwindcss/colors');

// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
    },
    animation: {
      none: 'none',
      spin: 'spin 1s linear infinite',
      ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      bounce: 'bounce 1s infinite',
    },
    aspectRatio: {
      auto: 'auto',
      square: '1 / 1',
      video: '16 / 9',
      picture: '3 / 4',
    },
    borderRadius: {
      none: '0px',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      amber: colors.amber,
      red: colors.red,
    },
    extend: {
      colors: {
        hyperlink: '#4300F9',
        'primary-50': '#E9EBF8',
        'primary-75': '#B3B1ED',
        'primary-100': '#9491E5',
        'primary-200': '#6561DA',
        'primary-300': '#4641D2',
        'primary-400': '#312E93',
        'primary-500': '#2B2880',
        primary: '#4641D2',
        'information-50': '#F0F1FE',
        'information-75': '#C1C6FD',
        'information-100': '#A7AEFC',
        'information-200': '#828CFA',
        'information-300': '#6874F9',
        'information-400': '#4951AE',
        'information-500': '#3F4798',
        information: '#4641D2',
        'success-50': '#ECF6EC',
        'success-75': '#B0D9AF',
        'success-100': '#8FCA8E',
        'success-200': '#5FB35E',
        'success-300': '#3EA33D',
        'success-400': '#2B722B',
        'success-500': '#266325',
        success: '#3EA33D',
        'low-warning-50': '#FEFAEB',
        'low-warning-75': '#FAE9AE',
        'low-warning-100': '#F7E08D',
        'low-warning-200': '#F4D25B',
        'low-warning-300': '#F2C93A',
        'low-warning-400': '#A98D29',
        'low-warning-500': '#947B23',
        'low-warning': '#F2C93A',
        'high-warning-50': '#FDF2EC',
        'high-warning-75': '#F8C9B1',
        'high-warning-100': '#F5B390',
        'high-warning-200': '#F09260',
        'high-warning-300': '#ED7C40',
        'high-warning-400': '#A6572D',
        'high-warning-500': '#914C27',
        'high-warning': '#ED7C40',
        'danger-50': '#FBEBEB',
        'danger-75': '#EFAEAE',
        'danger-100': '#E88C8C',
        'danger-200': '#DE5B5B',
        'danger-300': '#D73939',
        'danger-400': '#972828',
        'danger-500': '#832323',
        danger: '#D73939',
        'neutral-0': '#FFFFFF',
        'neutral-10': '#FAFAFA',
        'neutral-20': '#F6F6F6',
        'neutral-30': '#ECECEC',
        'neutral-40': '#E0E0E0',
        'neutral-50': '#C4C4C4',
        'neutral-60': '#B6B6B6',
        'neutral-70': '#AAAAAA',
        'neutral-80': '#9C9C9C',
        'neutral-90': '#8E8E8E',
        'neutral-100': '#808080',
        'neutral-200': '#717171',
        'neutral-300': '#636363',
        'neutral-400': '#030303',
        'neutral-500': '#494949',
        'neutral-600': '#3D3D3D',
        'neutral-700': '#2D2D2D',
        'neutral-800': '#1F1F1F',
        'neutral-900': '#131313',
        neutral: '#636363',
        secondary: '#828C97',
        error: '#F87171',
        'accent-hover': '#9491E5',
        'accent-focus': '#6561DA',
        'accent-disable': '#D5D9DC',
        'accent-secondary': '#EDF3FB',
        'semantic-link': '#4300F9',
        'semantic-secondary': '#828C97',
        'background-success': '#E4F9E2',
        'background-warning': '#FFF3E2',
        'background-error': '#FBEDEE',
        'background-link': '#EDF3FB',
        'background-disable': '#EEEEEE',
        'background-disable-hover': '#F0F3F6',
        'background-disable-lower': '#F6F8FC',
        'neutral-secondary': '#515961',
        'neutral-primary': '#0C0D0E',
        'neutral-disable': '#A0A0A7',
        'neutral-placeholder': '#C1C6CE',
        'border-base': '#DBDBDB',
        'border-secondary': '#BEBEBE',
        'icon-primary': '#4641D2',
        'icon-secondary': '#515961',
        'icon-active': '#0C0D0E',
        'icon-default': '#828C97',
        'icon-primary-hover': '#6561DA',
        'icon-disable': '#A0A0A7',
      },
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
  },
  plugins: [],
};
