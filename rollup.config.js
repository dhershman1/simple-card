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
  external: [
    'kyanite/type',
    'kyanite/and',
    'kyanite/not',
    'kyanite/or',
    'kyanite/assign',
    'kyanite/every',
    'kyanite/find',
    'kyanite/range',
    'kyanite/some'
  ],
  output: {
    file: 'dist/simple-card.min.js',
    format: 'umd',
    name: 'simpleCard',
    globals: {
      'kyanite/type': 'type',
      'kyanite/and': 'and',
      'kyanite/not': 'not',
      'kyanite/or': 'or',
      'kyanite/assign': 'assign',
      'kyanite/every': 'every',
      'kyanite/find': 'find',
      'kyanite/range': 'range',
      'kyanite/some': 'some'
    }
  }
}, {
  input: './src/index.js',
  plugins: [
    babel(),
    cleanup(),
    filesize()
  ],
  external: [
    'kyanite/type',
    'kyanite/and',
    'kyanite/not',
    'kyanite/or',
    'kyanite/assign',
    'kyanite/every',
    'kyanite/find',
    'kyanite/range',
    'kyanite/some'
  ],
  output: {
    file: 'dist/simple-card.js',
    format: 'umd',
    name: 'simpleCard',
    globals: {
      'kyanite/type': 'type',
      'kyanite/and': 'and',
      'kyanite/not': 'not',
      'kyanite/or': 'or',
      'kyanite/assign': 'assign',
      'kyanite/every': 'every',
      'kyanite/find': 'find',
      'kyanite/range': 'range',
      'kyanite/some': 'some'
    }
  }
}]
