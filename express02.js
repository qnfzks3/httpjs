const express= require('express');
const app = express();
const port = process.env.PORT || 3000;
const html ='text/html; charset=utf-8';
const path = require('path');

const indexRouter=require('./routes/index');
const userRouter=require('./routes/user');
const aboutRouter=require('./routes/about');


// index 에 대한 route handler 지정


app.use('/',indexRouter);
app.use('/user',userRouter);    // use ('파일이 들어가기 위한 조건은 경로 /',들어가는 파일 )
app.use('/about',aboutRouter);

//routes / 들어갈 파일  - 들어가서 해당 파일을 연다.









app.listen(port, () => {            //서버 구동 port
    console.log('서버 실행중... 중지하려면 ctrl+c를 눌러요!');
})