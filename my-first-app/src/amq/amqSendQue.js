import amqConnection from "./amqConnection";

export const sendNotification = async (notification) => {
    await amqConnection.connect().then(()=>{
        amqConnection.sendToQueue(process.env.NOTIFICATION_QUEUE, notification);
    });

    console.log('메세지 전송을 성공 하였습니다.');
}   