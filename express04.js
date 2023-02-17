// req: HTTP 요청(request) 객체. 클라이언트가 보낸 요청에 대한 정보가 담겨 있습니다.

// res: HTTP 응답(response) 객체. 서버가 클라이언트에게 보낼 응답에 대한 정보가 담겨 있습니다.

// next: 다음 미들웨어 함수를 호출하는 함수. 현재 등록된 미들웨어 함수의 처리가 끝나면,
// 이 함수를 호출하여 다음 미들웨어 함수를 실행합니다. 다음 미들웨어 함수가 없다면, 요청 처리를 종료합니다.

// err: 에러 객체. 이 인자는 다른 미들웨어 함수에서 발생한 에러를 처리하기 위해 사용됩니다.
// 일반적으로 이 인자는 next(err)를 호출함으로써 다음 에러 처리 미들웨어 함수로 전달됩니다.

const express= require('express');
const app = express();
const port = process.env.PORT || 3000;

const path = require('path');
const logger=require('morgan');  //로그를 콘솔에 출력기
const {engine} = require('express-handlebars')
const bodyParser=require('body-parser'); //폼 처리기
const oracledb=require('./models/Oracle')


//view 템플릿 엔진 설정
app.engine('hbs',engine({
    extname:'.hbs',
    defaultLayout:'layout',
    helpers: {
        section: function(name, options) {
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        },
    }

}));
app.set('views',path.join(__dirname,'views'));  /*view 파일들이 들어있는곳에서*/
app.set('view engine','hbs');                    /*엔진 hbs(헨들바스)를 사용하겠다.*/


//라우팅 외부 작성

const indexRouter=require('./routes/index');
const userRouter=require('./routes/user');
const aboutRouter=require('./routes/about');


//라우팅을 거치지 않고 직접 호출해서 응답
app.use(express.static(path.join(__dirname,'static')));   // static에 있는 모든 파일은 router을 쓰지않고 사용


//로그 설정
app.use(logger('dev'));

//미들웨이 등록 및 설정   --미들웨이 : 서로 다른 소프트웨어 시스템 간에 데이터를 전송하거나 처리하는 데 사용되는 소프트웨어
app.use(express.json());   // 제이슨 값으로 변형한다.

//전송된 폼 데이터에 대한 urlencoding 설정
app.use(express.urlencoded({extended:false}));   //반드시 이 두개가 있어야
app.use(bodyParser.json());  //전송된 폼 데이터는 json 형식                   넘어올수 있다.
oracledb.initConn();  //Oracle 데이터베이스와의 연결에 필요한 환경 변수 및 기본값을 초기화하는 역할을 합니다.



// index 에 대한 route handler 지정                  route = 외부에서 요청이 오면 그 요청에 적합한 데이터를 서버에서 안내하는 함수


app.use('/',indexRouter);
app.use('/user',userRouter);    // use ('파일이 들어가기 위한 조건은 경로 /',들어가는 파일 )
app.use('/about',aboutRouter);

//routes / 들어갈 파일  - 들어가서 해당 파일을 연다.


//404 파일 처리

app.use((req,res)=>{
    res.status(404);
    res.sendFile(path.join(__dirname,'public','404.html'))
})

//500 처리

app.use((err,req,res,next)=>{
    console.log(err)
    res.status(500);  //상태
    res.sendFile(path.join(__dirname,'public','500.html'))
})


app.listen(port, () => {            //서버 구동 port
    console.log('서버 실행중... 중지하려면 ctrl+c를 눌러요!');

})