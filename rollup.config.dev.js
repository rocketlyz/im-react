const path = require('path');
const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const serve = require('rollup-plugin-server');
const livereload = require('rollup-plugin-livereload');
const pkg = require('./package.json');

const extensions = ['.js', '.ts'];

const resolve = function(...args) {
  return path.resolve(__dirname, ...args);
};

module.exports = {
  input: resolve('./src/index.ts'),
  output: [
    // {
    //   file: resolve('./', 'test/bundle.js'),
    //   format: 'esm',
    //   sourcemap: true,
    // },
    {
      file: resolve('./', 'test/bundle.js'),
      format: 'iife',
      sourcemap: true,
    }
  ],
  plugins: [
    nodeResolve({
      extensions,
      modulesOnly: true,
    }),
    babel({
      exclude: 'node_modules/**',
      extensions,
    }),
    livereload(),
    serve({
      open: true,
      port: 8090,
      contentBase: 'test',
    })
  ],
};