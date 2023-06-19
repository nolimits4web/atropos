/* eslint-disable no-unused-vars */
const fs = require('fs-extra');
// const { rollup } = require('rollup');
// const { default: resolve } = require('@rollup/plugin-node-resolve');
// const replace = require('@rollup/plugin-replace');
const Terser = require('terser');
const less = require('less');
const CleanCSS = require('clean-css');

async function buildElement(format, browser) {
  const env = process.env.NODE_ENV || 'development';
  let filename = 'atropos-element';
  if (format !== 'umd') filename += `.${format}`;
  if (format === 'esm' && browser) filename += '.browser';
  const output = env === 'development' ? 'build' : 'package';
  const needSourceMap = env === 'production' && (format === 'umd' || (format === 'esm' && browser));
  try {
    fs.ensureDirSync(`${output}/element`);

    const content = fs.readFileSync('src/element/atropos-element.js', 'utf-8');
    const { code: minifiedContent, error } = await Terser.minify(content);
    if (error) {
      throw error;
    }
    fs.writeFileSync(`${output}/element/${filename}.js`, minifiedContent);
    console.log('JS minification completed!');
  } catch (error) {
    console.error('Error occurred during JS minification:', error);
  }

  // Less to CSS and Minified CSS
  const lessFilePath = 'src/atropos.less';
  const cssFilePath = `${output}/element/${filename}.css`;

  const lessContent = fs.readFileSync(lessFilePath, 'utf-8');
  const { css } = await less.render(lessContent);
  const minifiedCssContent = new CleanCSS().minify(css).styles;

  try {
    // Check if ESM script or UMD script
    if (format === 'esm' || format === 'umd') {
      const existingScriptContent = fs.readFileSync(`${output}/element/${filename}.js`, 'utf-8');
      const updatedScriptContent = existingScriptContent.replace(
        '// CSS_PLACEHOLDER',
        `const styles = document.createElement('style');\nstyles.innerHTML = '${minifiedCssContent}';\ndocument.head.appendChild(styles);`,
      );
      fs.writeFileSync(`${output}/element/${filename}.js`, updatedScriptContent);
      console.log('CSS minification completed!');
    }
  } catch (error) {
    console.error('Error occurred while adding minified CSS to the script:', error);
  }
}

async function build() {
  await Promise.all([
    buildElement('esm', false),
    buildElement('esm', true),
    buildElement('umd', true),
  ]);
  console.log('Element build completed!');
}

module.exports = build;
