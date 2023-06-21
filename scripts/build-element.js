/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const fs = require('fs-extra');
const less = require('less');
const CleanCSS = require('clean-css');
const { rollup } = require('rollup');
const Terser = require('terser');
const path = require('path');
const replace = require('@rollup/plugin-replace');

const banner = require('./banner')();

async function buildElement(format, browser) {
  const env = process.env.NODE_ENV || 'development';
  const outputDir = env === 'development' ? 'build' : 'package';
  const external = format === 'umd' || browser ? [] : (m) => !m.includes('atropos-element.js');
  let filename = 'atropos-element';
  if (format !== 'umd') filename += `.${format}`;
  if (format === 'esm' && browser) filename = 'atropos-element.esm';
  try {
    const data = fs.readFileSync('src/atropos.less', 'utf-8');
    let minifiedCss;

    try {
      const output = await less.render(data);
      const { css } = output;
      minifiedCss = new CleanCSS().minify(css).styles;
    } catch (err) {
      console.error('Error compiling LESS:', err);
      return;
    }

    const content = fs.readFileSync('src/element/atropos-element.js', 'utf-8');
    const updateContent = content.replace(
      "import styles from '../atropos.less';",
      `const styles = \`${minifiedCss}\`;`,
    );

    try {
      fs.writeFileSync('src/element/atropos-element-updated.js', updateContent, 'utf-8');
    } catch (err) {
      console.error('Error writing file:', err);
      return;
    }

    rollup({
      input: './src/element/atropos-element-updated.js',
      external,
      plugins: [
        replace({
          delimiters: ['', ''],
          'process.env.FORMAT': JSON.stringify(format),
          'process.env.BROWSER': browser,
          ...(format === 'esm'
            ? {
                "customElements.define('atropos-component', AtroposComponent);":
                  'export default AtroposComponent;',
              }
            : {}),
        }),
      ],
    })
      .then(async (bundle) => {
        fs.ensureDirSync(`./${outputDir}/element/`);
        const outputFile = path.join(`./${outputDir}/element/`, `${filename}.js`);

        return bundle
          .write({
            file: outputFile,
            format,
            name: 'Atropos Component',
            banner,
          })
          .then(() => {
            const code = fs.readFileSync(outputFile, 'utf-8');
            const updateFile = 'src/element/atropos-element-updated.js';
            fs.removeSync(updateFile);

            if (env === 'development' || !browser) {
              return;
            }
            // Minify with Terser
            // eslint-disable-next-line consistent-return
            return Terser.minify(code, {
              output: {
                preamble: banner,
              },
            })
              .catch((err) => {
                console.error(`Terser failed: ${err.toString()}`);
                return Promise.reject(err);
              })
              .then((minifiedCode) => {
                const minifiedOutputFile = path.join(
                  `./${outputDir}/element/`,
                  `${filename}.min.js`,
                );
                fs.writeFileSync(minifiedOutputFile, minifiedCode.code);
              });
          })
          .catch((error) => {
            console.error('Error during Rollup build:', error);
          });
      })
      .catch((error) => {
        console.error('Error during Rollup build:', error);
      });
  } catch (err) {
    console.error('Error:', err);
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
