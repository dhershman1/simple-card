import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  output: {
    name: 'simpleCard',
    format: 'umd',
    file: 'dist/simple-card.umd.js'
  },
  plugins: [
    buble(),
    uglify()
  ]
};
