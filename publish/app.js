const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();
const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const app = express();

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
// 다른 middleware에게 정보를 전달하고 싶으면 req.data를 사용하는걸 추천한다

app.use(morgan('dev'));
app.use(cookieparser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
    },
    name: 'session-cookie',
}));

app.use('/', indexRouter);
app.use('/user', userRouter);

const multer = require('multer');
const fs = require('fs');

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file);
    res.send('ok');
});
// app.use('요청경로', express.static('실제경로'));
// middleware 확장법 실무에서 유용하게 사용되니 알아두자!!
app.use('/', (req, res, next) => {
    if (req.session.id) {
        express.static(path.join(__dirname, 'public-3030'))(req, res, next)
    } else {
        next();
    }
});

// body-parser 부분 이제 express 기본 내장되어 있기 때문에 따로 설치할 필요 x
// form 요청 본문을 해석할 수 있음
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // true면 qs, false면 query string(내장) qs 추천

// 이미지나 동영상 파일 업로드할 경 ex) 파일 선택창 떠서 파일 선택 업로드하는 feature.
// form 태그의 enctype이 multipart/form-data인 경우이다
// 이 때는 body-parser 기능으로 해석할 수 없어서 multer라는 패키지를 이용한다

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