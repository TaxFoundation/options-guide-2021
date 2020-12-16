const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const _ = require('lodash');

fs.readdir(path.join(__dirname, '/data'), (err, files) => {
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
          console.log(results);
          results.forEach(row => {
            const indicator = _.camelCase(row['indicator']);
            if (!data[indicator]) data[indicator] = {};
            data[indicator][_.camelCase(row['subIndicator'])] = parseFloat(
              String(row['value']).replace('$', ''),
            );
            console.log(row, row['Indicator'], indicator);
          });
          console.log(`Finished ${file}`);
          console.log(data);
        });
    });
  }
});
