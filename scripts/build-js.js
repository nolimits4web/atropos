/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */

const fs = require('fs-extra');
const { rollup } = require('rollup');
const { default: babel } = require('@rollup/plugin-babel');
const { default: resolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const Terser = require('terser');

const banner = require('./banner')();

async function buildJs(format) {
  const env = process.env.NODE_ENV || 'development';
  const filename = 'atropos';
  const ext = format === 'esm' ? 'mjs' : 'js';
  const output = env === 'development' ? 'build' : 'package';
  const needSourceMap = env === 'production' && (format === 'iife' || format === 'esm');

  return rollup({
    input: './src/atropos.js',
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.FORMAT': JSON.stringify(format),
        ...(format === 'iife'
          ? {
              'export const defaults': 'const defaults',
              'export { Atropos };': '',
            }
          : {}),
      }),
      resolve({ mainFields: ['module', 'main', 'jsnext'] }),
      babel({ babelHelpers: 'bundled' }),
    ],
  })
    .then((bundle) =>
      bundle.write({
        format,
        name: 'Atropos',
        strict: true,
        sourcemap: needSourceMap,
        sourcemapFile: `./${output}/${filename}.${ext}.map`,
        banner,
        file: `./${output}/${filename}.${ext}`,
      }),
    )
    .then(async (bundle) => {
      if (env === 'development') {
        return;
      }
      const result = bundle.output[0];
      const { code, map } = await Terser.minify(result.code, {
        sourceMap: {
          content: needSourceMap ? result.map : undefined,
          filename: needSourceMap ? `${filename}.min.${ext}` : undefined,
          url: `${filename}.min.${ext}.map`,
        },
        output: {
          preamble: banner,
        },
      }).catch((err) => {
        console.error(`Terser failed on file ${filename}: ${err.toString()}`);
      });

      fs.writeFileSync(`./${output}/${filename}.min.${ext}`, code);
      fs.writeFileSync(`./${output}/${filename}.min.${ext}.map`, map);
    })
    .catch((err) => {
      console.error(err.toString());
    });
}

async function build() {
  await Promise.all([buildJs('esm'), buildJs('esm'), buildJs('iife')]);
  console.log('Scripts build completed!');
}

module.exports = build;
