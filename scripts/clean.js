const path = require('path');
const fs = require('fs');
const del = require('del');

const fileList = fs.readdirSync(path.join(__dirname, '..'));

const ignoredFiles = [
  '.git',
  '.gitignore',
  '.npmignore',
  '.eslintignore',
  'node_modules',
  'src',
  'scripts',
  '.babelrc'
];
const results = fileList.filter(f => {
  const { ext, name } = path.parse(f);

  return !ext && ignoredFiles.indexOf(name) === -1;
});

del(results).then(() => {
  console.info('Finished Cleaning Up');
});
