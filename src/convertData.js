const fs = require('fs-extra');
const path = require('path');
const csv = require('csv-parser');
const _ = require('lodash');

const SOURCE = path.join(__dirname, '/data');
const DEST = path.join(__dirname, '../public/data/figures');

fs.emptyDir(DEST)
  .then(() => {
    fs.readdir(SOURCE, (err, files) => {
      if (err) {
        console.error(err);
      } else {
        files.forEach(file => {
          let results = [];
          let data = {};
          fs.createReadStream(path.join(__dirname, '/data', file))
            .pipe(csv({ mapHeaders: ({ header, index }) => _.camelCase(header) }))
            .on('data', row => {
              results.push(row);
            })
            .on('end', () => {
              results.forEach(row => {
                const indicator = _.camelCase(row['indicator']);
                if (!data[indicator]) data[indicator] = {};
                data[indicator][_.camelCase(row['subIndicator'])] = parseFloat(
                  String(row['value']).replace('$', ''),
                );
              });
              fs.writeFileSync(path.join(DEST, `${file.split('.')[0]}.json`), JSON.stringify(data));
              console.log(`Finished ${file}`);
            });
        });
      }
    });
  })
  .catch(err => console.error(err));
