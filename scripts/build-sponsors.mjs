import fs from 'fs';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const API_URL = 'https://sponsors.nolimits4web.com/api/sponsors/atropos';
const SPONSORS_URL = 'https://sponsors.nolimits4web.com/#atropos';
const PLANS = ['Gold Sponsor', 'Sponsor'];
const PER_ROW = 12;

const README_PATH = path.resolve(__dirname, '../README.md');
const BACKERS_PATH = path.resolve(__dirname, '../BACKERS.md');

const escapeHtml = (str) =>
  str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const escapeMd = (str) => str.replace(/([[\]])/g, '\\$1');

const replaceBetween = (content, marker, replacement) => {
  const parts = content.split(marker);
  if (parts.length !== 3) {
    throw new Error(`Expected exactly two "${marker}" markers`);
  }
  parts[1] = replacement;
  return parts.join(marker);
};

const getSponsors = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch sponsors: HTTP ${res.status}`);
  }
  const data = await res.json();
  const sponsors = {};
  PLANS.forEach((plan) => {
    sponsors[plan] = data
      .filter((item) => (item.plan === 'Gold Sponsor' ? 'Gold Sponsor' : 'Sponsor') === plan)
      .sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1));
  });
  return sponsors;
};

const buildTable = (sponsors) => {
  const items = PLANS.flatMap((plan) => sponsors[plan]).filter((item) => item.image);
  if (!items.length) return '\n';

  const rows = [];
  for (let i = 0; i < items.length; i += PER_ROW) {
    rows.push(items.slice(i, i + PER_ROW));
  }
  const lastRow = rows[rows.length - 1];
  if (rows.length > 1 && lastRow.length < PER_ROW) {
    lastRow.push(...Array.from({ length: PER_ROW - lastRow.length }));
  }

  const content = rows
    .map((row) =>
      [
        '  <tr>',
        ...row.map((item) =>
          !item
            ? '    <td align="center" valign="middle"></td>'
            : [
                '    <td align="center" valign="middle">',
                `      <a href="${escapeHtml(item.link)}" target="_blank">`,
                `        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" width="160">`,
                '      </a>',
                '    </td>',
              ].join('\n'),
        ),
        '  </tr>',
      ].join('\n'),
    )
    .join('\n');

  return `\n<table>\n${content}\n</table>\n`;
};

const buildList = (items) => {
  if (!items.length) {
    return `\n_No sponsors yet. [Become the first one](${SPONSORS_URL})!_\n`;
  }
  return `\n${items.map((item) => `- [${escapeMd(item.title)}](${item.link})`).join('\n')}\n`;
};

const buildSponsors = async () => {
  const sponsors = await getSponsors();
  const table = buildTable(sponsors);

  const readme = fs.readFileSync(README_PATH, 'utf-8');
  fs.writeFileSync(README_PATH, replaceBetween(readme, '<!-- SPONSORS_TABLE_WRAP -->', table));

  let backers = fs.readFileSync(BACKERS_PATH, 'utf-8');
  backers = replaceBetween(backers, '<!-- SPONSORS_TABLE_WRAP -->', table);
  backers = replaceBetween(backers, '<!-- GOLD_SPONSOR -->', buildList(sponsors['Gold Sponsor']));
  backers = replaceBetween(backers, '<!-- SPONSOR -->', buildList(sponsors.Sponsor));
  fs.writeFileSync(BACKERS_PATH, backers);

  console.log(
    `Sponsors updated: ${sponsors['Gold Sponsor'].length} gold, ${sponsors.Sponsor.length} regular`,
  );
};

buildSponsors();
