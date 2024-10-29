const amqp = require("amqplib");

const connectConfig = {
    hostname: process.env.RMQHOST || 'localhost',
    username: process.env.RMQUSER || 'guest', 
    password: process.env.RMQPASS || 'guest',
    rm_que: process.env.RM_QUEUE || 'order',
    rmport: process.env.RMPORT    || '5672',
    vhost: process.env.VHOST || ''
};

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
            this.connection = await amqp.connect(
                `amqp://${connectConfig.username}:${connectConfig.password}@${connectConfig.hostname}:${connectConfig.rmport}/${connectConfig.vhost}`
            );

            console.log('que생성용 RabbitMQ 서버 연결 성공');
            this.channel = await this.connection.createChannel();
            console.log('que생성용 채널 생성 성공');
        } catch (error) {
            console.error(`mq 서버연결 실패`);
            throw error;
        }
    }

    //연결 강제 종료용
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