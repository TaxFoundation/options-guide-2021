const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

fs.readdir(path.join(__dirname, '/data'), (err, files) => {
  if (err) {
    console.error(err);
  } else {
    files.forEach(file => {
      console.log(path.join(__dirname, '/data', file));
      fs.createReadStream(path.join(__dirname, '/data', file))
        .pipe(csv())
        .on('data', row => {
          console.log(row);
        })
        .on('end', () => {
          console.log(`Finished ${file}`);
        });
    });
  }
});
