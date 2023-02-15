const http = require('http');
const fs = require('fs');                 // 파일 불러올수 있도록 하는 함수 fs
const path = require('path');                 // 파일 불러올수 있도록 하는 함수 fs
const port = process.env.PORT || 3000;    // 서버 번호 지정
const html ='text/html; charset=utf-8';


//요청에 대한 정적파일을 서비스하는 함수
function serveStaticFile(res,fname){ // fs.readFile('' ,' ') 는 비동기적으로 파일을 읽어들인다.
    fs.readFile(path.join(__dirname+'public'+fname), (err,data) => { //매개변수로 오류와 데이터를 지정 오류가 발생 혹은 데이터를 불러온다
        if (err){ //파일을 읽다가 오류가 발생했다면
            //응답코드 500 전송 후 오류 메세지 출력
            res.writeHead(500,{'Content-Type': html});
            return res.end('<h1>파일처리중 오류 발생!!</h1>')
        }
        res.writeHead(200,{'Content-Type': html});   // 아니면 데이터를 불러옴
        res.end(data);

    })
    //지정 파일 밑에 public 경로가 오류가 생기면err  정상작동하면 data 파일 출력

}

//localhost:3000 요청시 , 요청 path 별 처리 세분화 - > routing
//요청 path :/
//요청 path :/user
//요청 path :/about
//그외 나머지 : 404 - 페이지 없음


const server = http.createServer((req, res) => {

    switch (req.url){
        case '/' :
            serveStaticFile(res,'index.html');
            break;
        case '/user' :
            serveStaticFile(res,'user.html');
            break;
        case '/about' :
            serveStaticFile(res,'about.html');
            break;

        default:
            serveStaticFile(res,'404.html');

    }

});
server.listen(port, () => {
    console.log('서버 실행중... 중지하려면 ctrl+c를 눌러요!');
});
