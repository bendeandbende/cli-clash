const fs = require('fs');

module.exports = JSON.parse(fs.readFileSync(`./data/data.json`));
