const fs = require('fs');

const readStream = fs.createReadStream('./readme1.txt', {highWaterMark: 16});
const writeStream = fs.createWriteStream('./write2.txt');
readStream.pipe(writeStream);
