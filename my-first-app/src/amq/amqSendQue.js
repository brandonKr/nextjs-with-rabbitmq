import amqConnection from "./amqConnection";

export const sendNotification = async (notification) => {
    await amqConnection.connect();
    await amqConnection.sendToQueue(process.env.NOTIFICATION_QUEUE, notification);

    console.log('Sent the notification to consumer');
}   