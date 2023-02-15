const express= require('express');       //모듈을 가져오기
const app = express();                  //서버를 생성 
const port = process.env.PORT || 3000;     // 서버를 3000으로 지정
const html ='text/html; charset=utf-8';     // 텍스트는 utf-8

//라우팅 설정: app.메서드(경로, 콜백함수)  get,post

app.get('/user/add', (req, res)=>{    //서버 요청  about

    res.type(html);
    res.end('<h1>user 가입 페이지입니다.</h1>');
});

//routing path 추가분 - 파일이 복잡해짐!
app.get('/user/view', (req, res)=>{

    res.type(html);
    res.end('<h1>user 상세정보 페이지입니다.</h1>');
});

//custom404 routing
//라우팅 설정 2 : app.use(경로 , 콜백함수)  use로도 사용이 가능하다. 

app.use((req,res)=>{
    res.type(html);
    res.status(404);
    res.end('<h1>404- 존재하지않는 페이지 입니다. </h1>')
})

app.listen(port, () => {            //서버 구동 port
    console.log('서버 실행중... 중지하려면 ctrl+c를 눌러요!');
});