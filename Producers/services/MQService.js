const ampq = require('amqplib/callback_api')

const CONN_URL = 'amqps://xnasuaap:EdhC6Fksr6XZEZIGEh3rShDZFn49sZKW@gull.rmq.cloudamqp.com/xnasuaap'
let ch = null

ampq.connect(CONN_URL,(err,conn) => {
    conn.createChannel((err,channel) => {
        ch = channel;
    })
});

exports.publishToQueue = async(queueName,data) => {
    console.log(`Id inserted into Queue with ${data.toString()}`);
    ch.sendToQueue(queueName,Buffer.from(data.toString()),{persistent: true});
}

process.on('exit',(code) => {
    ch.close();
    console.log('Closing rabbitmq channel');
});
