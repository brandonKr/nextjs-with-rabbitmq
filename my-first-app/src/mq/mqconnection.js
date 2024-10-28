const amqp = require("amqplib");

class mqconnection {
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
            // console.log(`amqp://${process.env.RMQUSER}:${process.env.RMQPASS}@${process.env.RMQHOST}:5672/${process.env.VHOST}`);
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

    async close() {
        if (this.channel) {
            await this.channel.close();
        }
        if (this.connection) {
            await this.connection.close();
        }
    }
}

const mqConnection = new mqconnection();

module.exports = mqConnection;