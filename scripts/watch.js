const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const buildJs = require('./build-js');
// const buildTypes = require('./build-types');
const buildStyles = require('./build-styles');
const buildReact = require('./build-react');
const buildVue = require('./build-vue');
const buildElement = require('./build-element');

console.log(chalk.cyan('Watching file changes ...'));

const watchFunction = async (fileName) => {
  if (fileName.includes('.less') || fileName.includes('.css') || fileName.includes('.scss')) {
    console.log('Building styles');
    await buildStyles();
    return;
  }
  // if (fileName.includes('.d.ts')) {
  //   console.log('Building Types');
  //   await buildTypes();
  //   return;
  // }
  if (fileName.includes('tmp') || fileName === 'element') {
    return;
  }
  if (fileName.includes('react')) {
    console.log('Building React');
    buildReact();
    return;
  }
  if (fileName.includes('vue')) {
    console.log('Building Vue');
    buildVue();
    return;
  }
  if (fileName.includes('element')) {
    console.log({ fileName });
    console.log('Building Element');
    buildElement();
    return;
  }
  if (fileName.includes('.js')) {
    console.log('Building scripts');
    await buildJs();
    return;
  }

  console.log('something wrong...');
};

const recursive = !(
  process.platform === 'linux' && parseInt(process.versions.node.split('.')[0], 10) >= 14
);
let watchTimeout;
fs.watch(path.resolve(__dirname, '../src'), { recursive }, (eventType, fileName) => {
  clearTimeout(watchTimeout);
  watchTimeout = setTimeout(() => {
    watchFunction(fileName);
  }, 100);
});
