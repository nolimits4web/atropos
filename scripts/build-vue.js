/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const { promise: exec } = require('exec-sh');
const fs = require('fs-extra');
const bannerVue = require('./banner')('Vue');

module.exports = async () => {
  const format = 'esm';
  const env = process.env.NODE_ENV || 'development';
  const outputDir = env === 'development' ? 'build' : 'package';

  // Babel
  await exec(
    `cross-env MODULES=${format} npx babel --config-file ./babel.config.vue.js src/vue/atropos-vue.js --out-file ${outputDir}/vue/atropos-vue.${format}.js`,
  );

  // Add banner
  let fileContent = await fs.readFile(`./${outputDir}/vue/atropos-vue.${format}.js`, 'utf-8');
  fileContent = `${bannerVue}\n${fileContent}`;
  await fs.writeFile(`./${outputDir}/vue/atropos-vue.${format}.js`, fileContent);

  console.log('Vue build completed!');
};
