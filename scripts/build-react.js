/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const { promise: exec } = require('exec-sh');
const fs = require('fs-extra');
const bannerReact = require('./banner')('React');

module.exports = async () => {
  const env = process.env.NODE_ENV || 'development';
  const outputDir = env === 'development' ? 'build' : 'package';
  await exec(
    `cross-env MODULES=esm npx babel --config-file ./babel.config.react.js src/react/atropos-react.js --out-file ${outputDir}/atropos-react.mjs`,
  );

  // Add banner
  let fileContent = await fs.readFile(`./${outputDir}/atropos-react.mjs`, 'utf-8');
  fileContent = `${bannerReact}\n${fileContent}`;
  await fs.writeFile(`./${outputDir}/atropos-react.mjs`, fileContent);

  console.log('React build completed!');
};
