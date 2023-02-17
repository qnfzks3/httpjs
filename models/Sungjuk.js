const oracledb = require('../models/Oracle');

class SungJuk {
    options = {
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT
    };

    selectsql = ` select sjno,name,kor,eng,mat, ` +
        ` to_char(regdate, 'YYYY-MM-DD') regdate from sungjuk ` +
        ` order by sjno desc `;

    selectOnesql = ` select sjno, name,kor ,eng,mat ,tot,avg,grd,  ` +
        ` to_char(regdate, 'YYYY-MM-DD HH:MI:SS') regdate ` +
        ` from sungjuk  where sjno = :1 `;




    // 생성자 정의 - 변수 초기화
    // 즉, 매개변수로 전달된 값을 클래스 멤버변수에 대입함
    constructor(name,kor,eng,mat,tot,avg,grd) {
        this.name = name;
        this.kor = kor;
        this.eng = eng;
        this.mat = mat;
        this.tot = tot;
        this.avg = avg;
        this.grd = grd;
    }

    // 성적 저장
    async insert() {
        let conn = null;
        let sql = 'insert into sungjuk (sjno, name, kor, eng, mat, tot, avg, grd) ' +
            ' values (sjno.nextval, :1,:2,:3,:4,:5,:6,:7) ';
        let params = [this.name, this.kor, this.eng, this.mat,
            this.tot, this.avg, this.grd];

        try {
            conn = await oracledb.makeConn();
            let result = await conn.execute(sql, params);
            await conn.commit();
            console.log(result);
        } catch (e) {
            console.log(e);
        } finally {
            await oracledb.closeConn(conn);
        }
    }

    // 성적 전체조회
    async select() {
        let conn = null;
        let result = null;
        let sjs = [];

        try {
            conn = await oracledb.makeConn();
            result = await conn.execute(this.selectsql, [], this.options);

            let rs = result.resultSet;
            let row = null;
            while((row = await rs.getRow())) {
                let sj = new SungJuk(row[1],row[2],row[3],row[4]);
                sj.sjno = row[0];
                sj.regdate = row[5];
                sjs.push(sj);
            }
        } catch (e) {
            console.log(e);
        } finally {
            await oracledb.closeConn(conn);
        }

        return await sjs;
    }

    // 성적 상세조회
    async selectOne(sjno) {
        let conn = null;
        let result = null;
        let sjs = [];


        try {
            conn = await oracledb.makeConn();
            result = await conn.execute(this.selectOnesql, [sjno], this.options);

            let rs = result.resultSet;
            let row = null;
            while((row = await rs.getRow())) {
                let sj = new SungJuk(row[1],row[2],row[3],row[4], row[5],row[6], row[7]);

                sj.sjno = row[0];
                sj.regdate = row[8];
                sjs.push(sj);
            }
        } catch (e) {
            console.log(e);
        } finally {
            await oracledb.closeConn(conn);
        }

        return await sjs;
    }






}

module.exports = SungJuk;