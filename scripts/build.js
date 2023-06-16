const buildJs = require('./build-js');
const buildStyles = require('./build-styles');
const buildTypes = require('./build-types');
const buildReact = require('./build-react');
const buildVue = require('./build-vue');
const buildSvelte = require('./build-svelte');
const buildElement = require('./build-element');

const build = () => {
  buildJs();
  buildStyles();
  buildTypes();
  buildReact();
  buildVue();
  buildSvelte();
  buildElement();
};
build();
