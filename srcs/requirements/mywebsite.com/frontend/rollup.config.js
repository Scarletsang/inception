import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import sourcemaps from 'rollup-plugin-sourcemaps';
import includePaths from 'rollup-plugin-includepaths';

export default {
  plugins: [
    sourcemaps(),,
    // Resolve bare module specifiers to relative paths
    resolve(),
    // Minify JS
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
    }),
    // Use absolute path for imports
    includePaths({
      include: {},
      paths: ['js'],
      external: [],
      extensions: ['.js', '.json', '.html']
    })
  ],
  input: 'js/index.js',
  output: {
    sourcemap: true,
    file: 'dist/bundle.js',
    format: 'es'
  },
  preserveEntrySignatures: 'strict',
};