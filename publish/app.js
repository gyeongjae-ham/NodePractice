const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const cookieparser = require('cookie-parser');

// 순서를 따지자면 set하는 부분이 제일 윗 부분이고 전체 route에 적용할 middleware 그 다음 기본 route들
// 그 다음 wildcard 적용한 route들
// route들과 error 처리 사이에 404 처리하는 부분(error 처리는 아님)
// 끝 부분에 error 처리하는 route
// 마지막 부분에 listen
// 한 router에서 두 번이상 response는 안된다(응답은 한번만!!)
// 응답 후에 head 작성해도 똑같이 안된다
// 응답하는 코드 res. send, sendFile, render 등
// next('rout')를 사용하면 다음 미들웨어가 아니라 다음 라우터로 넘어간다


app.set('port', process.env.PORT || 3000);

// 미들웨어 순서가 매우 중요하다!!!
// static 요청은 morgan 다음 정도가 좋다
// 요청이 들어오고, static을 먼저 처리하고 아니면 API로 넘어가면 되기 때문이다
// 미들웨어 순서에 정답은 없고 서비스 환경에 따라서 미들웨어 순서를 조절하면 된다
// ex) 로그인 한 유저에게만 static 파일을 제공하려면 cookie-parser랑 session이 static 미들웨어보다 위에 온다

app.use(morgan('dev'));
// app.use('요청경로', express.static('실제경로'));
app.use('/', express.static(path.join(__dirname, 'public-3030')));
app.use(cookieparser('gyeongjaepassword'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // true면 qs, false면 query string(내장) qs 추천


app.get('/', (req, res, next) => {
    req.cookies // { mycookie: 'test' }
    req.signedCookies;
    // 'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    res.cookie('name', encodeURIComponent(name), {
        expires: new Date(),
        httpOnly: true,
        path: '/',
    });
    res.clearCookiee('name', encodeURIComponent(name), {
        httpOnly: true,
        path: '/',
    });
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
    res.send('hello express');
});

app.get('/category/:name', (req, res) => {
    res.send(`hello ${res.params.name}`);
});

app.use((req, res, next) => {
    res.status(404).send('404입니다');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('에러났지롱, 근데 안알려주지롱');
});

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});