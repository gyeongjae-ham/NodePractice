const exec = require('child_process').exec;

var process = exec('pwd');

process.stdout.on('data', function (data) {
    console.log(data.toString());
});

process.stderr.on('data', function (data) {
    console.error(data.toString());
});

// 노드에서도 terminal 명령어를 칠 수 있게 해준다