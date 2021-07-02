/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */

const fs = require('fs-extra');
const path = require('path');
const less = require('./utils/less');
const autoprefixer = require('./utils/autoprefixer');
const minifyCSS = require('./utils/clean-css');
const banner = require('./banner')();

const buildCSS = async ({ minified, outputDir }) => {
  const lessContent = await fs.readFile(path.resolve(__dirname, '../src/atropos.less'), 'utf8');

  const cssContent = await autoprefixer(
    await less(lessContent, path.resolve(__dirname, '../src')),
  ).catch((err) => {
    throw err;
  });

  const fileName = 'atropos';

  // Write file
  await fs.ensureDir(`./${outputDir}`);
  await fs.writeFile(`./${outputDir}/${fileName}.css`, `${banner}\n${cssContent}`);
  if (minified) {
    const minifiedContent = await minifyCSS(cssContent);
    await fs.writeFile(`./${outputDir}/${fileName}.min.css`, `${banner}\n${minifiedContent}`);
  }
};

module.exports = async () => {
  const env = process.env.NODE_ENV || 'development';
  const outputDir = env === 'development' ? 'build' : 'package';
  buildCSS({ minified: env !== 'development', outputDir });
  buildCSS({ minified: env !== 'development', outputDir });

  // Copy less & scss
  const files = ['atropos.less', 'atropos.scss'];
  await Promise.all(
    files.map(async (file) => {
      const distFilePath = path.resolve(__dirname, `../${outputDir}`, file);
      const srcFilePath = path.resolve(__dirname, '../src', file);
      const distFileContent = await fs.readFile(srcFilePath, 'utf-8');
      await fs.ensureDir(path.dirname(distFilePath));
      await fs.writeFile(distFilePath, distFileContent);
    }),
  );

  console.log('Styles build completed!');
};
