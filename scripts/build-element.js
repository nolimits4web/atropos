const fs = require('fs-extra');
const Terser = require('terser');
// const less = require('less');
// const CleanCSS = require('clean-css');

module.exports = async () => {
  const env = process.env.NODE_ENV || 'development';
  const outputDir = env === 'development' ? 'build' : 'package';

  // Minified JS
  try {
    const content = fs.readFileSync('src/element/atropos-element.js', 'utf-8');
    const { code: minifiedContent, error } = await Terser.minify(content);
    if (error) {
      throw error;
    }
    fs.writeFileSync(`${outputDir}/element/atropos-element.js`, minifiedContent);
    console.log('JS minification completed!');
  } catch (error) {
    console.error('Error occurred during JS minification:', error);
  }

  // Less to CSS and Minified CSS
  // const lessFilePath = 'src/atropos.less';
  // const cssFilePath = `${outputDir}/element/styles.css`;

  // const lessContent = fs.readFileSync(lessFilePath, 'utf-8');
  // const { css } = await less.render(lessContent);
  // const minifiedCssContent = new CleanCSS().minify(css).styles;
  // fs.writeFileSync(cssFilePath, minifiedCssContent);

  console.log('Element build completed!');
};
