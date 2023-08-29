const amqp = require('amqplib');

async function publishMessage(message) {
    try{
        const connection = await amqp.connect('amqp://user:password@54.165.48.15:5672');
        const channel = await connection.createChannel();
      
        const exchange = 'my_exchange';
        const routingKey = '';
      
        await channel.assertExchange(exchange, 'direct', { durable: true });
        channel.publish(exchange, routingKey, Buffer.from(message));
      
        setTimeout(() => {
          connection.close();
        //   process.exit(0);
        }, 500); // Allow some time for the message to be sent before closing the connection
    }
    catch(e){
        console.log("---------")
        console.log("Error : ",e)
    }
}

module.exports={
    publishMessage
}