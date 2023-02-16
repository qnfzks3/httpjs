const  express = require('express');
const path = require("path");
const  router = express.Router();

// show index page

router.get('/',(req, res)=>{    //서버 요청  get
    //res.sendFile(path.join(__dirname,'../public','about.html'));
    res.render('about',{title: 'about'});
});





module.exports= router;  // 이 파일이 모듈 라우터로 작동한다

