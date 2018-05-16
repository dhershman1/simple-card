const fs = require('fs')
const path = require('path')
const jsDocParser = require('jsdoc-to-markdown')
const ignoredFiles = ['_internals', 'index.js']
const { version } = require('../package.json')

const listFns = () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'src'))

  return files
    .filter(file => (/^[^._]/).test(file) && !ignoredFiles.includes(file))
    .map(file => `./src/${file}`)
}

const generateUsage = name => ({
  'commonjs': {
    title: 'CommonJs',
    code: `const ${name} = require('simple-card/${name}')`
  },
  'standard': {
    title: 'Standard',
    code: `import ${name} from 'simple-card/${name}'`
  },
  'cdn': {
    title: 'CDN',
    code: `<script src="https://cdn.jsdelivr.net/npm/simple-card@${version}/${name}.js"></script>`
  },
  'browser': {
    title: 'Browser',
    code: `<script src="path/to/simple-card/${name}/index.js"></script>`
  }
})

const generateSyntax = (name, args) => {
  if (!args) {
    return ''
  }

  const argsStr = args.map(a => a.optional ? `[${a.name}]` : a.name).join(', ') // eslint-disable-line

  return `${name}(${argsStr})`
}

jsDocParser.getTemplateData({
  'files': listFns(),
  'no-cache': true
}).then(data => {
  const results = data.map(d => ({
    since: d.since ? d.since : 'Unknown',
    title: d.name,
    desc: d.description,
    examples: d.examples,
    returns: d.returns,
    params: d.params,
    syntax: generateSyntax(d.name, d.params),
    usage: generateUsage(d.name)
  }))

  fs.writeFile('docs.js', `module.exports = ${JSON.stringify(results)}`, writeErr => {
    if (writeErr) {
      throw writeErr
    }
  })
})
