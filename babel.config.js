module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-flow',
  ],

  env: { test: { plugins: ['istanbul'] } },
};
