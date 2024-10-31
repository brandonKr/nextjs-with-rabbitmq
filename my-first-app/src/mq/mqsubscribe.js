const amqp = require('amqplib/callback_api');

class AsyncSubscriber {
  constructor(topic, callback, logger) {
    this._topic = topic;
    this._callback = callback;
    this._logger = logger;
    this._channel = null;
    this._queue_name = null;
  }

  _onExchangeDeclared() {
    this._channel.assertQueue('', {
      exclusive: true,
      durable: false,
      autoDelete: true,
      arguments: this.getNewQueueParams()
    }, (err, q) => {
      if (err) {
        throw err;
      }
      this._queue_name = q.queue;
      this._channel.bindQueue(this._queue_name, this._topic, '', {}, this._onQueueBind.bind(this));
    });
  }

  _onQueueBind() {
    this._channel.consume(this._queue_name, this._onMessage.bind(this), {
      noAck: true
    }, this._onConsumeOk.bind(this));
  }

  _onMessage(msg) {
    this._callback(msg);
  }

  _onConsumeOk() {
    this._logger.info(`Started consuming ${this._topic}!`);
  }

  start(channel) {
    this._channel = channel;
    this._channel.assertExchange(this._topic, 'fanout', {
      passive: true,
      durable: true
    }, this._onExchangeDeclared.bind(this));
  }

  getNewQueueParams() {
    // Implement your logic to get new queue parameters here
    return {};
  }
}

if (args.mode === "subscribe") {
  const topics = [`${args.robot_id}/${DELIVERIES_UPDATE_TOPIC}`, `${args.robot_id}/${STATUS_TOPIC}`];
  const subs = topics.map(topic => new AsyncSubscriber(topic, print_update, logging));

  function onChannelOpen(channel) {
    logging.debug("Channel opened.");
    subs.forEach(sub => sub.start(channel));
  }

  function onOpen(connection) {
    logging.debug("Connection opened.");
    connection.createChannel(onChannelOpen);
  }

  try {
    const conn = connect(args.addr, args.user, args.password, args.vhost, args.cert_path, onOpen, false);
    logging.info("Started.");
    conn.ioloop.start();
  } catch (err) {
    if (err instanceof KeyboardInterrupt) {
      logging.debug("Closing connection.");
      conn.close();
      conn.ioloop.start();
    } else {
      throw err;
    }
  }
}
