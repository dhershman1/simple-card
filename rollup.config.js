import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import filesize from 'rollup-plugin-filesize'
import { uglify } from 'rollup-plugin-uglify'

export default [{
  input: './src/index.js',
  plugins: [
    babel(),
    uglify(),
    filesize()
  ],
  output: {
    file: 'dist/simple-card.min.js',
    format: 'umd',
    name: 'simpleCard'
  }
}, {
  input: './src/index.js',
  plugins: [
    babel(),
    cleanup(),
    filesize()
  ],
  output: {
    file: 'dist/simple-card.js',
    format: 'umd',
    name: 'simpleCard'
  }
}]
