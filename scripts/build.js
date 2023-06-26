const buildJs = require('./build-js');
const buildStyles = require('./build-styles');
const buildTypes = require('./build-types');
const buildReact = require('./build-react');
const buildElement = require('./build-element');

const build = () => {
  buildJs();
  buildStyles();
  buildTypes();
  buildReact();
  buildElement();
};
build();
