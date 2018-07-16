export default {
  cache: false,
  require: [
    '@babel/register',
  ],
  files: [
    'src/*.test.js',
  ],

  babel: {
    testOptions: {
      presets: [
        '@babel/preset-env',
        '@babel/preset-flow',
      ],
    },
  },
};
