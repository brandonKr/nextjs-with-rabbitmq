import mqConnection from '@/mq/mqconnection';

export default async function handler(req,res){
  try {
    const data = req.body;
    const exchange = 'robot_ex'  //exchange 메인서버(?) {타입 업체와 협의 해서 결정}
    const queue = 'order'        //메세지를 저장하는하는 역할 {타입 업체와 협의 해서 결정}
    const route = 'order_route'  //exchange 서버에서 queue를 확인하는 키 {타입 업체와 협의 해서 결정}

    await mqConnection.connect();
    const channel = mqConnection.channel;

     // Exchange, Queue 설정
    await Promise.all([
      channel.assertExchange(exchange, 'direct'),
      channel.assertQueue(queue),
      channel.bindQueue(queue, exchange, route)
    ]);

    //메세지 발행
    const sent = channel.publish(
        exchange,
        route,  
        Buffer.from(JSON.stringify(data))
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