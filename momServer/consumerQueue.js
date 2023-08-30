const amqp = require('amqplib');
const sendMessage = require('./sendMessage.js')
const {getFiles,getFile} = require('../utils')

require( 'dotenv').config();
const {REMOTE_HOST} = process.env

async function consumeMessages() {
  const connection = await amqp.connect(`amqp://user:password@${REMOTE_HOST}:5672`);
  const channel = await connection.createChannel();

  const queue = 'my_app';

  await channel.assertQueue(queue, { durable: true });
  console.log(`Waiting for messages in ${queue}. To exit press CTRL+C`);

  channel.consume(
    queue,
    (msg) => {
      if (msg.content) {
        const data = msg.content.toString();
        const obj = JSON.parse(data);
        console.log(obj);
        const path = "../files"
        if(obj.method == "listFiles"){
          const response = getFiles(path);
          sendMessage(response,obj.email)
          console.log(response);
        }else{
          const response = getFile(path,obj.fileName);
          sendMessage(response,obj.email)
          console.log(response)
        }
        console.log(`${msg.content.toString()} is received`);
        
      }
    },
    { noAck: true }
  );
}
consumeMessages().catch(console.error);
