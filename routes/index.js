const  express = require('express');
const  router = express.Router();
const html ='text/html; charset=utf-8';  //아래 텍스트를 사용할거니까 써준다.
const path = require('path');
const SungJuk=require('../models/Sungjuk')

const {query} = require("express");


// show index page

router.get('/',(req, res)=>{    //서버 요청 app-> router
    //res.sendFile(path.join(__dirname,'../public','index.html'));  //__dirname 는 현재 파일 index.js의 경로를 나타낸다.
                                                                  // 또한  '../public/index.html'에서
                                                                  // 경로를 / 대신에,로 '../public','index.html'이렇게 쓴다

    //handlebars 뷰 엔진으로 응답처리
    res.render('index',{title:'index'})    /*view 이름*/

});

router.get('/sungjuk',(req, res)=>{    //서버 요청 app-> router
    res.render('sungjuk',{title:'성적처리'})    /*view 이름*/

});



router.post('/sungjuk', (req, res)=>{    //서버 요청 app-> router
    //폼으로 전송된 데이터들은 req.body, req.body.폼 이름 등으로 확인 가능  - 왜냐면 req에 전송되니까.- json 형식으로하면 -정상적으로 인식함


    //console.log(req.body);
    //console.log(req.body.name,req.body.kor,req.body.eng,req.body.mat);
    let {name,kor,eng,mat}=req.body;
    kor=parseInt(kor);
    eng=parseInt(eng);
    mat=parseInt(mat);
    console.log(name,kor,eng,mat);//데이터 받아아서 초기화 함


   let [tot, avg ,grd] =[kor+eng+mat,(kor+eng+mat)/3,'가'];
    if (avg >= 90) grd = '수';
    else if (avg >= 80) grd = '우';
    else if (avg >= 70) grd = '미';
    else if (avg >= 60) grd = '양';
    console.log(tot, avg, grd);


   console.log(tot,avg,grd);

   //데이터베이스 처리 - sungjuk 테이블에 insert
    new SungJuk(name,kor,eng,mat,tot,avg,grd).insert();

    res.redirect(304,'/');

});

router.get('/showsungjuk',(req, res)=>{    //서버 요청 app-> router

    let sjs=new SungJuk().select().then();
    res.render('showsungjuk ',{title:'성적전체보기',sjs: sjs})    /*view 이름*/

});

/*
router.get('/smile.png',(req, res)=>{

    res.sendFile(path.join(__dirname,'../static/img','smile.png'))

});
*/

//단순한 그림파일을 화면에 표시하기 위해
//일일이 라우팅 설정하는 것은 번거로움






//express.Router() 는 타고 들어가도록 만듬

module.exports= router;  // 이 파일이 모듈 라우터로 작동한다




