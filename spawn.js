const spawn = require('child_process').spawn;

const process = spawn('python', ['test.py']);

process.stdout.on('data', function (data) {
    console.log(data.toString());
});

process.stderr.on('data', function (data) {
    console.error(data.toString());
});다

// 노드에서 다른 언어로 작업할 수 있게 명령할 수 있음 대신, 그 언어 깔려있어야 함.