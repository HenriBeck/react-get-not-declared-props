import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import typescript from 'rollup-plugin-typescript';

const pkg = require('./package');

const matchSnapshot = process.env.MATCH_SNAPSHOT === 'true';
const plugins = [
  typescript(),
  sizeSnapshot({
    matchSnapshot,
    printInfo: false,
    snapshotPath: './.size-snapshot.json',
  }),
];
const input = './src/index.ts';

export default [
  {
    input,
    output: {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
    },
    plugins,
  },
  {
    input,
    output: {
      file: pkg.module,
      format: 'esm',
    },
    plugins,
  },
]