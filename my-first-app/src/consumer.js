const amqp = require('amqplib');

/*
package.json 파일 열어보면 6번라인에 로딩하면서 읽는 스크립트 위치가 있음
concurrently => 서버와 클라이언트 스크립트를 동시에 실행 하도록 함
?
그렇다면 module을 import 할수 있을것 같은데.. 방법을 모르겠음
/mq/mqconnectiion 이게 임포트가 안되서 아래와 같이 별도로 처리함
?
*/

const main = async() => {
    const exchange = 'robot_ex'  //exchange 메인서버(?) {타입 업체와 협의 해서 결정}
    const queue = 'order'        //메세지를 저장하는하는 역할 {타입 업체와 협의 해서 결정}
    const route = 'order_route'  //exchange 서버에서 queue를 확인하는 키 {타입 업체와 협의 해서 결정}

    const uri = 'localhost';
    const user = 'guest';
    const pass = 'guest';

    //로딩할때 .env에 있는 설정을 못읽음.. 어떻게 하는거지?
    const connection = await amqp.connect(
        `amqp://${user}:${pass}@${uri}:5672`
    );
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange,'direct');
    await channel.assertQueue('order');
    await channel.bindQueue(queue,exchange,route);


    channel.consume(
        queue,
        async contents =>{
            if (contents) {
                const mensaje = contents.content.toString();
                const content = JSON.parse(mensaje);
                console.log('Message from queue', content);

                //que에 데이터가 쌓였을때 호출하는 API
                //여기다 만들것
                const userRequest = await fetch('https://jsonplaceholder.typicode.com/todos/2');
                //<== 테스트용 샘플 url이니 바꿔서 사용하자
                //여기서 외부 module을 import 해서 호출 하고 싶은데 방법을.. 모르겠음
                const userData = await userRequest.json();

                console.log(userData);

            }
        },{noAck : true}
    )
};
main();