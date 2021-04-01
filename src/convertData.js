const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');
const showdown = require('showdown');
const d3 = require('d3-dsv');
const _ = require('lodash');

const TEXT_SOURCE = path.join(__dirname, '/data/text');
const DATA_SOURCE = path.join(__dirname, '/data/figures');
const DEST = path.join(__dirname, '/data/cleaned');

showdown.setFlavor('github');

function buildData() {
  console.log('Removing old files...');
  fs.emptyDirSync(DEST);
  const files = fs.readdirSync(TEXT_SOURCE);
  let compiledData = [];
  for (let i = 0, j = files.length; i < j; i++) {
    const file = files[i];
    console.log(`Reading ${file}...`);
    let option = {};
    const text = fs.readFileSync(path.join(TEXT_SOURCE, file), 'utf8');
    const converter = new showdown.Converter({ metadata: true });
    const html = converter.makeHtml(text);
    const { data: metadata } = matter(text);
    option.id = metadata.id;
    option.title = metadata.title;
    option.text = html;
    option.data = [];
    metadata.data.forEach(({ file, name }) => {
      const csvData = { name };
      const csv = fs.readFileSync(path.join(DATA_SOURCE, file), 'utf8');
      d3.csvParse(csv, d => {
        const indicator = _.camelCase(d['Indicator']);
        const subIndicator = _.camelCase(
          d['Sub-indicator']
            .replace(/\.0?%/g, '')
            .replace(' - ', 'To')
            .replace('2022To2031', 'total')
            .replace('TOTAL FOR ALL', 'total'),
        );
        if (!csvData[indicator]) {
          csvData[indicator] = {};
        }
        csvData[indicator][subIndicator] = d.Value.replace('$', '');
      });
      option.data.push(csvData);
    });
    compiledData.push(option);
    fs.writeFileSync(
      path.join(DEST, `${option.id}.json`),
      JSON.stringify(option),
    );
    console.log(`Finished parsing ${file}.`);
  }
  fs.writeFileSync(path.join(DEST, `data.json`), JSON.stringify(compiledData));
  console.log('New data written successfully.');
}

if (process.argv.includes('--watch')) {
  buildData();
  console.log('Watching for data chanes...');
  fs.watch(TEXT_SOURCE, { encoding: 'utf-8' }, buildData);
  fs.watch(DATA_SOURCE, { encoding: 'utf-8' }, buildData);
} else {
  buildData();
}
