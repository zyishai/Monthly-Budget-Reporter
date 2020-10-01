const mode = process.env.NODE_ENV;
// const production = !process.env.ROLLUP_WATCH;
const production = mode === 'production';
const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano')({
  preset: ['default', { discardComments: { removeAll: true } }],
});

module.exports = {
  plugins: [
    require('postcss-import')(),
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-preset-env')({
      stage: 3,
      features: {
        'nesting-rules': true,
      },
    }),
    ...(production
      ? [
          purgecss({
            content: ['./**/*.html', './**/*.svelte'],
            whitelistPatterns: [/svelte-/],
            defaultExtractor: (content) =>
              content.match(/[A-Za-z0-9-_:/]+/g) || [],
          }),
          cssnano,
        ]
      : []),
  ],
};
