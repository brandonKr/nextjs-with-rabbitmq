const amqp = require("amqplib");

class RabbitMQConnection {
    constructor() {
        this.connection = null;
        this.channel = null;
        this.connected = false;
    }

    async connect() {
        if (this.connected && this.channel) return;
        this.connected = true;

        try {
            console.log('⌛️ Connecting to Rabbit-MQ Server');
            console.log(`amqp://${process.env.RMQUSER}:${process.env.RMQPASS}@${process.env.RMQHOST}:5672/${process.env.VHOST}`);
            this.connection = await amqp.connect(
                `amqp://${process.env.RMQUSER}:${process.env.RMQPASS}@${process.env.RMQHOST}:5672`
            );

            console.log('✅ Rabbit MQ Connection is ready');
            this.channel = await this.connection.createChannel();
            console.log('🛸 Created RabbitMQ Channel successfully');
        } catch (error) {
            console.error(`Not connected to MQ Server`);
            throw error;
        }
    }

    async sendToQueue(queue, message) {
        try {
            if (!this.channel) {
                throw new Error('RabbitMQ 채널이 없습니다.');
            }
            this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async consume(handleIncomingNotification) {
        try {
            if (!this.channel) {
                throw new Error('RabbitMQ 채널이 없습니다.');
            }

            await this.channel.assertQueue(process.env.NOTIFICATION_QUEUE, {
                durable: true,
            });

            this.channel.consume(
                process.env.NOTIFICATION_QUEUE, (msg) => {
                    if (!msg) {
                        return console.error('RabbitMQ 메시지가 없습니다.');
                    }
                    handleIncomingNotification(msg.content.toString());
                    this.channel.ack(msg); // 수정된 부분
                }, {
                    noAck: false,
                }
            );
        } catch (error) {
            console.error(error);
        }
    }

    async close() {
        if (this.channel) {
            await this.channel.close();
        }
        if (this.connection) {
            await this.connection.close();
        }
    }
}

const mqConnection = new RabbitMQConnection();

module.exports = mqConnection;