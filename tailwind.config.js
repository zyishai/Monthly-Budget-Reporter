module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    fontFamily: {
      sans: ['Heebo', '-apple-system', 'BlinkMacSystemFont', 'Arial'],
    },
    extend: {},
  },
  variants: {
    backgroundColor: ['responsive', 'odd', 'even', 'hover', 'focus', 'active'],
  },
  plugins: [],
};
