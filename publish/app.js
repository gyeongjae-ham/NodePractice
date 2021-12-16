const express = require('express');
const path = require('path');
const app = express();

// 순서를 따지자면 set하는 부분이 제일 윗 부분이고 전체 route에 적용할 middleware 그 다음 기본 route들
// 그 다음 wildcard 적용한 route들
// route들과 error 처리 사이에 404 처리하는 부분(error 처리는 아님)
// 끝 부분에 error 처리하는 route
// 마지막 부분에 listen


app.set('port', process.env.PORT || 3000);
app.use((req, res, next) => {
    console.log('1 요청에 실행하고 싶어요');
    next();
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/about', (req, res) => {
    res.send('hello express');
});
app.get('/category/:name', (req, res) => {
    res.send(`hello ${res.params.name}`);
});
app.use((res, req, next) => {
    res.status(404).send('404입니다');
});
app.use((err, req, res, next) => {
    console.error(err);
    res.send('에러났지롱, 근데 안알려주지롱');
});

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});