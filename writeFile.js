const fs = require('fs').promises;

fs.writeFile('./write.txt', '글을 입력하는 중입니다.')
    .then(() => {
        return fs.readFile('./write.txt');
    })
    .then((data) => {
        console.log(data.toString());
    })
    .catch((err) => {
        throw err;
    });