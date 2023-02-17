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

//미들웨이 등록 및 설정
app.use(express.json());

//전송된 폼 데이터에 대한 urlencoding 설정
app.use(express.urlencoded({extended:false}));   //반드시 이 두개가 있어야
app.use(bodyParser.json());  //전송된 폼 데이터는 json 형식                   넘어올수 있다.
oracledb.initConn();



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