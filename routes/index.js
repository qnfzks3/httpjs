const  express = require('express');
const  router = express.Router();
const html ='text/html; charset=utf-8';  //아래 텍스트를 사용할거니까 써준다.
const path = require('path');
// show index page

router.get('/',(req, res)=>{    //서버 요청 app-> router
    res.sendFile(path.join(__dirname,'../public','index.html'));  //__dirname 는 현재 파일 index.js의 경로를 나타낸다.
                                                                  // 또한  '../public/index.html'에서
                                                                  // 경로를 / 대신에,로 '../public','index.html'이렇게 쓴다.

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




