const express= require('express');
const app = express();
const port = process.env.PORT || 3000;
const html ='text/html; charset=utf-8';
const path = require('path');
const logger=require('morgan');  //로그를 콘솔에 출력기

//라우팅 외부 작성

const indexRouter=require('./routes/index');
const userRouter=require('./routes/user');
const aboutRouter=require('./routes/about');


//라우팅을 거치지 않고 직접 호출해서 응답
app.use(express.static(path.join(__dirname,'static')));   // static  에 있는 모든 파일은 router을 쓰지않고 사용


//로그 설정
app.use(logger('dev'));



// index 에 대한 route handler 지정


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
    res.status(500);  //상태
    res.sendFile(path.join(__dirname,'public','500.html'))
})





app.listen(port, () => {            //서버 구동 port
    console.log('서버 실행중... 중지하려면 ctrl+c를 눌러요!');
})