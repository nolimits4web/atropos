/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const exec = require('exec-sh').promise;

async function buildAngular() {
  return exec(`ng build atropos --configuration production`);
}

module.exports = buildAngular;
