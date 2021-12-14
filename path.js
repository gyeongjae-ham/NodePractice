const path = require('path');

// 경로 처리

'C:\users\hiyee-gj'
'C:\\users\\hiyee-gj'

path.join(__dirname, '..', 'var.js'); // 부모 폴더에서 var.js
path.resolve(__dirname, '..', '/var.js'); // join이랑 거의 비슷한데 절대 경로 앞의 경로를 무시하고, join은 절대 경로를 무시한
