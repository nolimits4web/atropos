/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */

const fs = require('fs-extra');
const { rollup } = require('rollup');
const { default: babel } = require('@rollup/plugin-babel');
const { default: resolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const Terser = require('terser');

const banner = require('./banner')();

async function buildJs(format, browser) {
  const env = process.env.NODE_ENV || 'development';
  const external = format === 'umd' || browser ? [] : (m) => !m.includes('atropos.js');
  let filename = 'atropos';
  if (format !== 'umd') filename += `.${format}`;
  if (format === 'esm' && browser) filename += '.browser';
  const output = env === 'development' ? 'build' : 'package';
  const needSourceMap = env === 'production' && (format === 'umd' || (format === 'esm' && browser));

  return rollup({
    input: './src/atropos.js',
    external,
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.FORMAT': JSON.stringify(format),
        'process.env.BROWSER': browser,
        ...(format === 'umd'
          ? {
              'export { Atropos };': '',
            }
          : {}),
      }),
      resolve({ mainFields: ['module', 'main', 'jsnext'] }),
      babel({ babelHelpers: 'bundled' }),
    ],
    onwarn() {},
  })
    .then((bundle) =>
      bundle.write({
        format,
        name: 'Atropos',
        strict: true,
        sourcemap: needSourceMap,
        sourcemapFile: `./${output}/${filename}.js.map`,
        banner,
        file: `./${output}/${filename}.js`,
      }),
    )
    .then(async (bundle) => {
      if (format === 'esm') {
        // move esm files
        fs.ensureDirSync(`./${output}/esm/`);
        fs.readdirSync(`./${output}/`)
          .filter((f) => f.includes('.esm.'))
          .forEach((f) => {
            fs.renameSync(`./${output}/${f}`, `./${output}/esm/${f}`);
          });
      }
      if (env === 'development' || !browser) {
        return;
      }
      const result = bundle.output[0];
      const { code, map } = await Terser.minify(result.code, {
        sourceMap: {
          content: needSourceMap ? result.map : undefined,
          filename: needSourceMap ? `${filename}.min.js` : undefined,
          url: `${filename}.min.js.map`,
        },
        output: {
          preamble: banner,
        },
      }).catch((err) => {
        console.error(`Terser failed on file ${filename}: ${err.toString()}`);
      });

      fs.writeFileSync(`./${output}/${filename}.min.js`, code);
      fs.writeFileSync(`./${output}/${filename}.min.js.map`, map);

      if (format === 'esm') {
        // move esm files
        fs.readdirSync(`./${output}/`)
          .filter((f) => f.includes('.esm.'))
          .forEach((f) => {
            fs.renameSync(`./${output}/${f}`, `./${output}/esm/${f}`);
          });
      }
    })
    .catch((err) => {
      console.error(err.toString());
    });
}

async function build() {
  await Promise.all([buildJs('esm', false), buildJs('esm', true), buildJs('umd', true)]);
  console.log('Scripts build completed!');
}

module.exports = build;
