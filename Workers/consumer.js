var ampq = require('amqplib/callback_api')
const CONN_URL = 'amqps://xnasuaap:EdhC6Fksr6XZEZIGEh3rShDZFn49sZKW@gull.rmq.cloudamqp.com/xnasuaap'
const queue_name = 'user-details'

ampq.connect(CONN_URL,(err,conn) => {
    conn.createChannel((err,ch) => {
        ch.consume(queue_name,(msg) => {
            console.log("Id of Inserted User: ",msg.content.toString())
        },{noAck: true});
    })
})