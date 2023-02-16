const  express = require('express');
const  router = express.Router();

const path = require('path');

// show index page

router.get('/',(req, res)=>{    //서버 요청  about
    //res.sendFile(path.join(__dirname,'../public','user.html'));
    res.render('user',{title: 'user'});
});


module.exports= router;  // 이 파일이 모듈 라우터로 작동한다

