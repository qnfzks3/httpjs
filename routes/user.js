const  express = require('express');
const  router = express.Router();
const html ='text/html; charset=utf-8';  //아래 텍스트를 사용할거니까 써준다.
const path = require('path');

// show index page

router.get('/',(req, res)=>{    //서버 요청  about
    res.sendFile(path.join(__dirname,'../public','user.html'));
});

module.exports= router;  // 이 파일이 모듈 라우터로 작동한다

