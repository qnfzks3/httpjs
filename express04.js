// req: HTTP 요청(request) 객체. 클라이언트가 보낸 요청에 대한 정보가 담겨 있습니다.

// res: HTTP 응답(response) 객체. 서버가 클라이언트에게 보낼 응답에 대한 정보가 담겨 있습니다.

// next: 다음 미들웨어 함수를 호출하는 함수. 현재 등록된 미들웨어 함수의 처리가 끝나면,
// 이 함수를 호출하여 다음 미들웨어 함수를 실행합니다. 다음 미들웨어 함수가 없다면, 요청 처리를 종료합니다.

// err: 에러 객체. 이 인자는 다른 미들웨어 함수에서 발생한 에러를 처리하기 위해 사용됩니다.
// 일반적으로 이 인자는 next(err)를 호출함으로써 다음 에러 처리 미들웨어 함수로 전달됩니다.

const express = require('express');
const path = require('path');
const logger = require('morgan');  // 로그 출력기
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');   // 폼 처리기
const oracledb = require('./models/Oracle');

// 라우팅 외부 작성
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const aboutRouter = require('./routes/about');

const app = express();
const port = process.env.PORT || 3000;

// view 템플릿 엔진 설정
app.engine('hbs', engine({
    extname: '.hbs', defaultLayout: 'layout',
    helpers: {
        section: function(name, options) {
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        },
    },
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// 라우팅을 거치지 않고 직접 호출해서 응답
app.use(express.static(path.join(__dirname, 'static')));

// 로그 설정
app.use(logger('dev'));

// 미들웨어 등록 및 설정
app.use(express.json());
// 전송된 폼 데이터에 대한 urlencoding 설정
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());   // 전송된 폼 데이터는 json형식
// app.use(bodyParser.text());   // enctype이 text/plain일때 필요 (비추)

oracledb.initConn();  // 오라클 instant client 초기화

// index에 대한 route handler 지정
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/about', aboutRouter);

// 404 처리
app.use((req, res) => {
    res.status(404);
    res.sendFile(path.join(__dirname, 'public', '404.html'));
});

// 500 처리
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500);
    res.sendFile(path.join(__dirname, 'public', '500.html'));
});

app.listen(port, () => {
    console.log('express 서버 실행중... 중지하려면 ctrl+c를 눌러요!');
});