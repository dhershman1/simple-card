import babel from 'rollup-plugin-babel'
import filesize from 'rollup-plugin-filesize'
import globby from 'globby'
import path from 'path'
import { uglify } from 'rollup-plugin-uglify'

const buildEntry = () => {
  const results = []
  const paths = globby.sync(['src/*.js', '!src/index.js', '!src/_internals'])

  paths.forEach(p => {
    const { name } = path.parse(p)

    const config = {
      input: path.resolve(__dirname, p),
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
        dir: './',
        file: `${name}.js`,
        format: 'umd',
        name: name,
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
    }

    results.push(config)

    return true
  })

  return results
}

export default buildEntry()
