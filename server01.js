const http = require('http');
const port = process.env.PORT || 3000;

// localhost:3000 요청시 처리
const server = http.createServer((req, res) => {
    // 응답헤더 작성 : 응답코드, 응답 데이터 형식 지정      서버가 200이면 정상 작동 한다는 의미하며 이때 text/plain 타입의 헤더로 지정
    res.writeHead(200, {'Content-Type':'text/plain'});
    // 응답메세지 전송
    res.end('Hello, World!!');
});

server.listen(port, () => {
    console.log('서버 실행중... 중지하려면 ctrl+c를 눌러요!');
});