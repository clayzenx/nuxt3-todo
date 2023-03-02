import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['text', 'font-inter lh-140%'],
    ['text-small', 'font-inter lh-140% text-12px'],
    ['text-medium', 'font-inter lh-140% text-14px'],
    ['text-large', 'font-inter lh-140% text-16px'],

    ['column', 'flex flex-col'],
    ['centered', 'flex items-center justify-center gap-1'],
    ['icon-hover', 'rounded-2 hover-bg-gray-400 p-2 flex-inline cursor-pointer'],

    ['app-container', 'w-100% max-w-736px ma'],
    ['ui-container', 'border border-gray-400 bg-gray-500 rounded-2 p-4'],
    ['ui-input', 'bg-gray-500 border border-gray-700 b-rd-8px py-4 px-9 c-gray-300 outline-none hover-border-purple-dark active-border-purple-dark focus-border-purple-dark focus-c-gray-100'],
    ['ui-button', 'bg-blue-dark p-4 rounded-2 fw-700 hover-bg-blue w-100% text-center c-gray-100 active-border-purple-dark target-border-purple-dark outline-purple-dark disabled-bg-gray-300 disabled-hover-bg-gray-300 disabled-cursor-not-allowed required-border-danger'],
    ['ui-label', 'rounded-5 py-1 px-3 bg-gray-400 c-gray-300 hover-c-gray-100'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        inter: [
          {
            name: 'Inter',
            weights: ['300', '400', '700', '900'],
          },
          {
            name: 'sans-serif',
            provider: 'none',
          },
        ],
        mono: 'DM Mono',
      },
    }),
  ],
  theme: {
    colors: {
      purple: '#8284FA',
      purpleDark: '#5E60CE',
      blue: '#4EA8DE',
      blueDark: '#1E6F9F',
      danger: '#E25858',
      gray: {
        100: '#E1E1E6',
        200: '#D9D9D9',
        300: '#808080',
        400: '#333333',
        500: '#262626',
        600: '#1A1A1A',
        700: '#0D0D0D',
      },
    },
  },
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
