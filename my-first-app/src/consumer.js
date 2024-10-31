const amqp = require('amqplib');
const dotenv = require('dotenv');

/*
package.json 파일 열어보면 6번라인에 로딩하면서 읽는 스크립트 위치가 있음
concurrently => 서버와 클라이언트 스크립트를 동시에 실행 하도록 함
?
그렇다면 module을 import 할수 있을것 같은데.. 방법을 모르겠음
/mq/mqconnectiion 이게 임포트가 안되서 아래와 같이 별도로 처리함
?
*/

dotenv.config({ path: '.env.consume' });
// dotenv.config();

const connectConfig = {
    hostname: process.env.RMQHOST || 'localhost',
    username: process.env.RMQUSER || 'guest', 
    password: process.env.RMQPASS || 'guest',
    rm_que: process.env.RM_QUEUE || 'order',
    rmport: process.env.RMPORT    || '5672',
    vhost: process.env.VHOST || ''
};

//수신된 메세지 처리
const processMessage = async (content) => {
    try {
        const message = JSON.parse(content.toString());
        console.log('수신된 메시지:', message);

        //수신받은 메세지로 api처리 하기
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/2');
        const data = await response.json();
        console.log('API 응답:', data);

        return data;
    } catch (error) {
        console.error('메시지 처리 중 오류:', error);
        throw error;
    }
};

const getNewQueueParams  = () => {
    return {
        // 'x-message-ttl': 600, 
        // 'x-max-length': 10, 
        // 'x-max-length-bytes': 5000, 
    }
}

const main = async() => {
    const exchange = 'pennybot-0d3034/orders_update';
    const queue = null;        
    const route = 'pennybot-0d3034';  

    try {
        const connection = await amqp.connect(
            `amqp://${connectConfig.username}:${connectConfig.password}@${connectConfig.hostname}:${connectConfig.rmport}/${connectConfig.vhost}`
        );
        console.log('RabbitMQ 서버 연결 성공');

        const channel = await connection.createChannel();
        console.log('채널 생성 성공');
        
        await channel.assertExchange(exchange,'fanout');
        await channel.assertQueue('', {
            exclusive: true,
            durable: false,
            autoDelete: true,
            arguments : getNewQueueParams()
        }, (err, q) => {
            if (err) {
                console.error('Queue 생성 오류:', err);
                throw err;
            }   
            queue = q.queue;
            console.log('Exchange와 Queue 설정 완료',queue);
            channel.consume(queue, async (message) => {
                if (message) {
                    try {
                        channel.ack(message);
                        await processMessage(message.content);
                    } catch (error) {
                        console.error('메시지 처리 실패:', error);
                    }
                }
            }, { noAck: true });
            console.log('메시지 수신 대기 중...');
        });
        // 
        connection.on('error', (error) => {
            console.error('RabbitMQ 연결 오류:', error);
        });
        
        process.on('SIGINT', async () => {
            console.log('끝 RMS ...');
            await channel.close();
            await connection.close();
            process.exit(0);
        });

    } catch (error){
        console.error('초기화 중 오류 발생:', error);
    }
};
main();