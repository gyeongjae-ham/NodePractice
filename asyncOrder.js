const fs = require('fs');

fs.readFile('./textfile.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('1번', data.toString());
    fs.readFile('./textfile.txt', (err, data) => {
        if (err) {
            throw err;
        }
        console.log('2번', data.toString());
        fs.readFile('./textfile.txt', (err, data) => {
            if (err) {
                throw err;
            }
            console.log('3번', data.toString());
            fs.readFile('./textfile.txt', (err, data) => {
                if (err) {
                    throw err;
                }
                console.log('4번', data.toString());
            });
        });
    });
});

// 비동기 안에서 순서대로 실행할 수 있으나 이렇게 collback hell이 발생할 수 있다