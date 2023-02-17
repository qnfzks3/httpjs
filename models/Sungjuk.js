const oracledb=require('../models/Oracle');

class Sungjuk{
    

    //생성자 정의 - 변수 초기화
    //즉,매개변수로 전달된 값을 클래스 맴버변수에 대입함
    constructor(name,kor,eng,mat,tot,avg,grd) {
        this.name=name;             //this Sungjuk 함수를 의미
        this.kor=kor;
        this.eng=eng;
        this.mat=mat;
        this.tot=tot;
        this.avg=avg;
        this.grd=grd;

    }
    //성적 저장  save
    async insert(){                          //성적 insert 하고 저장

        let conn=null;
        let sql='insert into sungjuk'+
            '(sjno,name,kor,eng,mat ,tot,avg,grd)'+
            'values(sjno.nextval,:1,:2,:3,:4,:5,:6,:7)';
        let params=[this.name,this.kor,this.eng,this.mat,this.tot,this.avg,this.grd];
        console.log(this.name);
        try{
            conn=await oracledb.makeConn();
            let result= await conn.execute(sql,params);
            await conn.commit();
            //console.log(name,kor,eng,mat)

        }catch (e){
            console.log(e)
        }finally {
            await oracledb.closeConn(conn);

        }
        
    };

    //성적 전체 조회 list
    select(){}

    //성적 조회 view
    selectOne(sjno){}
    
}

module.exports = Sungjuk;

