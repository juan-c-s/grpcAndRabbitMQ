const amqp = require('amqplib');
const {getFiles,getFile} = require('../utils')

async function consumeMessages() {
  const connection = await amqp.connect('amqp://user:password@54.165.48.15:5672');
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

        const path = "../files"
        if(obj.method == "listFiles"){
          console.log(getFiles(path));
        }else{
          console.log(getFile(path,obj.fileName))
        }
        console.log(`${msg.content.toString()} is received`);
      }
    },
    { noAck: true }
  );
}

consumeMessages().catch(console.error);
