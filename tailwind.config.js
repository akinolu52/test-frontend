module.exports = {
  theme: {
    fontFamily: {
      'avenir': ['Avenir', 'system-ui', 'BlinkMacSystemFont', '-apple-system', 'Segoe UI', 'Roboto']
    },
    extend: {
      spacing: {
        80: "80%"
      },
      colors: {
        normal: {
          default: "#737A91"
        },
        blue: {
          lighter: '#b3bcf5',
          default: '#002C73',
          dark: '#1d2454',
        },
        yellow: {
          lighter: '#FFD005',
          default: '#F2B42A',
          dark: '#F2B42A',
        },
      },
      lineHeight: {
        '20': '4.625rem'
      }
    }
  },
  variants: {
    tableLayout: ['responsive', 'hover', 'focus']
  },
  plugins: []
}