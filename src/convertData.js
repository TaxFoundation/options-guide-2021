const fs = require('fs-extra');
const path = require('path');
const showdown = require('showdown');
const csv = require('csv-parser');
const _ = require('lodash');

const TEXT_SOURCE = path.join(__dirname, '/data/text');
const DATA_SOURCE = path.join(__dirname, '/data/figures');
const DEST = path.join(__dirname, '../public/data');

showdown.setFlavor('github');

fs.emptyDir(DEST)
  .then(() => {
    fs.readdir(TEXT_SOURCE, (err, files) => {
      if (err) {
        console.error(err);
      } else {
        files.forEach(file => {
          let option = {};
          const converter = new showdown.Converter({ metadata: true });
          fs.readFile(path.join(TEXT_SOURCE, file), 'utf8', (err, text) => {
            const html = converter.makeHtml(text);
            const meta = converter.getMetadata();
            option.id = meta.id;
            option.title = meta.title;
            option.text = html;
            let rows = [];
            let data = {};
            fs.createReadStream(path.join(DATA_SOURCE, meta.data))
              .pipe(csv({ mapHeaders: ({ header, index }) => _.camelCase(header) }))
              .on('data', row => {
                rows.push(row);
              })
              .on('end', () => {
                rows.forEach(row => {
                  const indicator = _.camelCase(row['indicator']);
                  if (!data[indicator]) data[indicator] = {};
                  data[indicator][_.camelCase(row['subIndicator'])] = parseFloat(
                    String(row['value']).replace('$', ''),
                  );
                });
                option.data = data;
                fs.writeFileSync(path.join(DEST, `${option.id}.json`), JSON.stringify(option));
                console.log(`Finished ${file}`);
              });
          });
        });
      }
    });
  })
  .catch(err => console.error(err));
