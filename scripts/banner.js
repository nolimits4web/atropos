const pkg = require('../package.json');

const date = new Date();
const formatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  year: 'numeric',
  month: 'long',
});
const releaseDate = formatter.format(date);

module.exports = (name = null) =>
  `${`
/**
 * Atropos ${name ? `${name} ` : ''}${pkg.version}
 * ${pkg.description}
 * ${pkg.homepage}
 *
 * Copyright 2021-${date.getFullYear()} ${pkg.author}
 *
 * Released under the ${pkg.license} License
 *
 * Released on: ${releaseDate}
 */
`.trim()}\n`;
