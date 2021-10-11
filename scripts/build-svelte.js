/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const fs = require('fs-extra');

module.exports = async () => {
  const env = process.env.NODE_ENV || 'development';
  const outputDir = env === 'development' ? 'build' : 'package';

  fs.copyFileSync('src/svelte/atropos-svelte.svelte', `${outputDir}/svelte/atropos-svelte.svelte`);

  console.log('Svelte build completed!');
};
