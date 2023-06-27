/* eslint-disable */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const path = require('path');
const fs = require('fs');

async function build(cb) {
  const env = process.env.NODE_ENV || 'development';
  const outputDir = env === 'development' ? 'build' : 'package';

  // core
  const coreContent = fs.readFileSync(path.resolve(__dirname, '../src/atropos.d.ts'), 'utf-8');
  fs.writeFileSync(path.resolve(__dirname, `../${outputDir}/atropos.d.ts`), coreContent);

  // react
  const reactContent = fs.readFileSync(
    path.resolve(__dirname, '../src/react/atropos-react.d.ts'),
    'utf-8',
  );
  fs.writeFileSync(path.resolve(__dirname, `../${outputDir}/atropos-react.d.ts`), reactContent);

  // element
  const elementContent = fs.readFileSync(
    path.resolve(__dirname, '../src/element/atropos-element.d.ts'),
    'utf-8',
  );
  fs.writeFileSync(path.resolve(__dirname, `../${outputDir}/atropos-element.d.ts`), elementContent);

  console.log('Types build completed!');
}

module.exports = build;
