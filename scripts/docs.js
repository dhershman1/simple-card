const fs = require('fs');
const path = require('path');
const jsDocParser = require('jsdoc-to-markdown');

const writeDocs = fileObj => fs.writeFileSync('docs.js', `module.exports = ${JSON.stringify(fileObj)}`);

const generateUsage = () => ({
  'commonjs': {
    title: 'CommonJs',
    code: `const simpleCard = require('simple-card');`
  },
  'standard': {
    title: 'Standard',
    code: `import simpleCard from 'simple-card';`
  },
  'browser': {
    title: 'Browser',
    code: `<script src="path/to/node_modules/simple-card/dist/simple-card.umd.js"></script>`
  }
});

console.log(path.join(process.cwd(), 'src', 'index.js'));
let generated = jsDocParser.getTemplateDataSync({
  'files': path.join(process.cwd(), 'src', 'index.js'),
  'no-cache': true
}).map(d => ({
  title: d.name,
  description: d.description,
  examples: d.examples,
  returns: d.returns,
  params: d.params
}));

generated = generated.map(doc => ({
  title: doc.title,
  syntax: 'simpleCard(card)',
  usage: generateUsage(),
  desc: doc.description,
  examples: doc.examples,
  params: doc.params,
  returns: doc.returns
}));

writeDocs(generated);
