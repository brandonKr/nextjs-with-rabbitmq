import { NextApiRequest, NextApiResponse } from 'next';
import mqConnection from '@/mq/mqconnection';

export default async function handler(req,res){
    const data = req.body;
    const exchange = 'robot_ex'  //exchange 메인서버(?) {타입 업체와 협의 해서 결정}
    const queue = 'order'        //메세지를 저장하는하는 역할 {타입 업체와 협의 해서 결정}
    const route = 'order_route'  //exchange 서버에서 queue를 확인하는 키 {타입 업체와 협의 해서 결정}

    await mqConnection.connect();
    const channel = mqConnection.channel;

    await channel.assertExchange(exchange,'direct'); //exchange 만드는 방법이 여러개 있으나 direct로 함 (direct,fanout,topic,headers)
    await channel.assertQueue('order'); // queue를 생성한다. 
    await channel.bindQueue(queue,exchange,route); //excahge 와 queue를 rouet를 사용하여 연결한다.

    //메세지 발행
    const sent = channel.publish(
        exchange,
        route,  
        Buffer.from(JSON.stringify(data))
    );

    //메세지 발행이 성공 했으면?
    if (sent){
        console.info(
          `- Sent message to ${exchange} -> ${route} ${JSON.stringify(
            data
          )}`
        )
        // await mqConnection.close();
        // 메세지 발행 후 연결 종료 하려고 했는데 이러면 exchange 서버가 닫힘
        res.status(200).json(data);
    }else{
        console.error(
          `Fail sending message to ${exchange} -> ${
            process.env.TRX_ROUTE
          }
          ${JSON.stringify(data)}`
        );
      res.status(200).json(data);
    }
}