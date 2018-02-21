const fs = require('fs');
const path = require('path');
const ignoredFiles = ['_internals', 'index.js'];

const listFns = () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'src'));

  return files
    .filter(file => (/^[^._]/).test(file) && !ignoredFiles.includes(file))
    .map(file => ({
      name: file,
      path: `./${file}`,
      fullPath: `./src/${file}/index.js`
    }));
};

const generateIndex = files => {
  const propertyRequireLines = files
    .map(fn => `export { default as ${fn.name} } from './${fn.name}'`);

  const indexLines = []
    .concat(propertyRequireLines.join(';\n'))
    .join('\n');

  return `${indexLines};\n`;
};

fs.writeFileSync('src/index.js', generateIndex(listFns()));
