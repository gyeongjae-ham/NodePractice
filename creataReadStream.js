const fs = require('fs');
const readStream = fs.createReadStream('./readme1.txt', { highWaterMark: 16 });

const data = [];
readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log('data:', chunk, chunk.length);
});
readStream.on('end', () => {
    console.log('end:', Buffer.concat(data).toString());
});
readStream.on('error', (err) => {
    console.log('error:', err);
});

// buffer 방식은 한번에 모아서 보내주는 방식이고, stream 방식은 조금씩 보내주는데 서버 메모리 부분에서 stream이 유리하다