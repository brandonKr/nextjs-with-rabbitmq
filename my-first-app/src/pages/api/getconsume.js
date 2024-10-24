import amqConnection from "@/amq/amqConnection";

let channel;

const handleIncomingNotification = (msg) => {
    try {
  
      const parsedMessage = JSON.parse(msg);
  
      console.log(`Received Notification`, parsedMessage);
  
      // Implement your own notification flow
  
    } catch (error) {
      console.error(`Error While Parsing the message`);
    }
  };


export default async function handler(req, res) {
    await getConsume().then(()=>{
        res.status(200).json({ message: 'success' });
    });
}

export async function getConsume(){    
    amqConnection.consume(handleIncomingNotification, (msg) => {
        console.log('수신완료');
    });
}
