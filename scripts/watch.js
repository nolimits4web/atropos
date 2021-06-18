const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const buildJs = require('./build-js');
// const buildTypes = require('./build-types');
const buildStyles = require('./build-styles');
// const buildReact = require('./build-react');
// const buildVue = require('./build-vue');

console.log(chalk.cyan('Watching file changes ...'));

const watchFunction = async (fileName, outputDir) => {
  if (fileName.includes('.less') || fileName.includes('.css') || fileName.includes('.scss')) {
    console.log('Building styles');
    await buildStyles(outputDir);
    return;
  }
  // if (fileName.includes('.d.ts')) {
  //   console.log('Building Types');
  //   await buildTypes();
  //   return;
  // }

  // if (fileName.includes('react')) {
  //   console.log('Building React');
  //   buildReact('esm', 'build');
  //   return;
  // }
  // if (fileName.includes('vue')) {
  //   console.log('Building Vue');
  //   buildVue('esm', 'build');
  //   return;
  // }
  if (fileName.includes('.js')) {
    console.log('Building scripts');
    await buildJs();
    return;
  }
  console.log('something wrong...');
};

let watchTimeout;
const outputDir = process.env.NODE_ENV === 'production' ? 'package' : 'build';
fs.watch(path.resolve(__dirname, '../src'), { recursive: true }, (eventType, fileName) => {
  clearTimeout(watchTimeout);
  watchTimeout = setTimeout(() => {
    watchFunction(fileName, outputDir);
  }, 100);
});
