import amqConnection from "@/amq/amqConnection";

let channel;
let parsedMessage;

const handleIncomingNotification = (msg) => {
    
    try {
      parsedMessage = JSON.parse(msg);
   
    } catch (error) {
      console.error(`Error While Parsing the message`);
    } finally {
        return parsedMessage;
    }
};


export default async function handler(req, res) {
        amqConnection.consume(handleIncomingNotification); 
        console.log('msg', parsedMessage);
        res.status(200).json(parsedMessage);
    
}

export async function getConsume(){   
    let msg = "123"; 
    const queuemsg = amqConnection.consume(handleIncomingNotification, (msg) => {
      msg = msg;
    });
    return queuemsg;
}
