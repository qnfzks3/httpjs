const  express = require('express');
const  router = express.Router();
const html ='text/html; charset=utf-8';  //아래 텍스트를 사용할거니까 써준다.

// show index page

router.get('/',(req, res)=>{    //서버 요청 app-> router
    res.type(html);
    res.end('<h1>index 페이지입니다.</h1>');
});

//express.Router() 는 타고 들어가도록 만듬

module.exports= router;  // 이 파일이 모듈 라우터로 작동한다




