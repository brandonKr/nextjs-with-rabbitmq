import mqConnection from '@/mq/mqconnection';
import {v4 as uuidv4} from 'uuid';

export default async function handler(req,res){
  try {
    const data = req.body;
    const exchange = ''  
    const queue = ''       
    const route = 'pennybot-0d3034'  
    const corr_id = uuidv4();
    const callbackqueue = 'amq.rabbitmq.reply-to';

    await mqConnection.connect();
    const channel = mqConnection.channel;

     // Exchange, Queue 설정
    // await Promise.all([
    //   channel.assertExchange(exchange, 'direct'),
    //   channel.assertQueue(queue),
    //   channel.bindQueue(queue, exchange, route)
    // ]);

    channel.consume(callbackqueue, (msg) => {
      if (msg.properties.correlationId === corr_id) {
        // channel.ack(msg); <== 메세지 처리 결과에 대한 응답인데.. noAck가 true라서 주석처리함
        //처리결과 확인
        console.log(msg.content.toString());
      }
    },{noAck: true});

    //메세지 발행
    const sent = channel.publish(
        exchange,
        route, 
        Buffer.from(JSON.stringify(data)),
        {correlationId : corr_id,
          replyTo : callbackqueue}
    );

    //메세지 발행이 성공 했으면?
    if (sent){
        console.info(
          `- 메세지 전송 성공:  ${exchange} -> ${route}`,data);
          return res.status(200).json({ 
            success: true, 
            message: '메세지가 성공적으로 전송되었습니다',
            data 
          });
        }
    throw new Error('메세지 전송 실패');

  } catch (error) {
    console.error('메세지 전송 중 오류 발생:', error);
    return res.status(500).json({ 
        success: false,
        message: '메세지 전송 중 오류가 발생했습니다',
        error: error.message
    });
  }
}