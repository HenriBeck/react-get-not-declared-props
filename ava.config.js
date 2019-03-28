export default {
  cache: true,
  files: ['src/*.test.ts'],
  compileEnhancements: false,
  failWithoutAssertions: true,
  failFast: true,
  concurrency: 5,
  extensions: ['ts'],
  require: ['ts-node/register/transpile-only'],
};
