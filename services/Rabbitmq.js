const amqp = require("amqplib");

let channel;

const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBIT_URL);
    channel = await connection.createChannel();
    await channel.assertQueue("server_updates", { durable: false });
    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error);
  }
};

const publishMessage = (message) => {
  connectToRabbitMQ();
  if (channel) {
    channel.sendToQueue("server_updates", Buffer.from(JSON.stringify(message)));
  } else {
    console.error("Channel is not established. Unable to send message.");
  }
};

module.exports = { connectToRabbitMQ, publishMessage };
