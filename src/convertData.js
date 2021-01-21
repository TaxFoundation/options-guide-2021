const fs = require('fs-extra');
const path = require('path');
const showdown = require('showdown');
const d3 = require('d3-dsv');
const _ = require('lodash');

const TEXT_SOURCE = path.join(__dirname, '/data/text');
const DATA_SOURCE = path.join(__dirname, '/data/figures');
const DEST = path.join(__dirname, '../public/data');

showdown.setFlavor('github');

fs.emptyDirSync(DEST);
const files = fs.readdirSync(TEXT_SOURCE);
let compiledData = [];
for (let i = 0, j = files.length; i < j; i++) {
  const file = files[i];
  let option = {};
  const converter = new showdown.Converter({ metadata: true });
  const text = fs.readFileSync(path.join(TEXT_SOURCE, file), 'utf8');
  const html = converter.makeHtml(text);
  const meta = converter.getMetadata();
  option.id = meta.id;
  option.title = meta.title;
  option.text = html;
  option.data = {};
  const csv = fs.readFileSync(path.join(DATA_SOURCE, meta.data), 'utf8');
  d3.csvParse(csv, d => {
    const indicator = _.camelCase(d['Indicator']);
    const subIndicator = _.camelCase(d['Sub-indicator']);
    if (!option.data[indicator]) {
      console.log(i, d);
      option.data[indicator] = {};
    }
    option.data[indicator][subIndicator] = d.Value;
  });
  compiledData.push(option);
  fs.writeFileSync(path.join(DEST, `${option.id}.json`), JSON.stringify(option));
  console.log(`Finished ${file}`);
}
fs.writeFileSync(path.join(DEST, `data.json`), JSON.stringify(compiledData));
