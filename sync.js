const fs = require('fs');


let data = fs.readFileSync('./textfile.txt');
console.log('1번', data.toString());
data = fs.readFileSync('./textfile.txt');
console.log('2번', data.toString());
data = fs.readFileSync('./textfile.txt');
console.log('3번', data.toString());
data = fs.readFileSync('./textfile.txt');
console.log('4번', data.toString());

// 동기적으로 처리하면 많은 요청이 있을 경우 응답이 느려서 여러번 실행할 경우에는 비동기적으로 쓴다