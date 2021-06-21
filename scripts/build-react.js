/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const { promise: exec } = require('exec-sh');
const fs = require('fs-extra');
const bannerReact = require('./banner')('React');

module.exports = async () => {
  const format = 'esm';
  const env = process.env.NODE_ENV || 'development';
  const outputDir = env === 'development' ? 'build' : 'package';

  await exec(
    `cross-env MODULES=${format} npx babel --config-file ./babel.config.react.js src/react/mariko-react.js --out-file ${outputDir}/react/mariko-react.${format}.js`,
  );

  // Add banner
  let fileContent = await fs.readFile(`./${outputDir}/react/mariko-react.${format}.js`, 'utf-8');
  fileContent = `${bannerReact}\n${fileContent}`;
  await fs.writeFile(`./${outputDir}/react/mariko-react.${format}.js`, fileContent);

  console.log('React build completed!');
};
