/* eslint-disable */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const path = require('path');
const fs = require('fs');

async function build(cb) {
  const env = process.env.NODE_ENV || 'development';
  const outputDir = env === 'development' ? 'build' : 'package';

  // core
  const coreContent = fs.readFileSync(path.resolve(__dirname, '../src/mariko.d.ts'), 'utf-8');
  fs.writeFileSync(path.resolve(__dirname, `../${outputDir}/mariko.d.ts`), coreContent);

  // react
  const reactContent = fs.readFileSync(
    path.resolve(__dirname, '../src/react/mariko-react.d.ts'),
    'utf-8',
  );
  fs.writeFileSync(
    path.resolve(__dirname, `../${outputDir}/react/mariko-react.d.ts`),
    reactContent,
  );

  // vue
  const vueContent = fs.readFileSync(
    path.resolve(__dirname, '../src/vue/mariko-vue.d.ts'),
    'utf-8',
  );
  fs.writeFileSync(path.resolve(__dirname, `../${outputDir}/vue/mariko-vue.d.ts`), vueContent);

  console.log('Types build completed!');
}

module.exports = build;
