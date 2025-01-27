const http = require("http");
const socketIo = require("socket.io");
const amqp = require("amqplib");

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://rabbitmq";
const QUEUE_NAME = "server_updates";

const server = http.createServer();
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: false });

    channel.consume(
      QUEUE_NAME,
      (msg) => {
        const messageContent = msg.content.toString();
        console.log("Received message:", messageContent);
        io.emit("serverUpdate", JSON.parse(messageContent));
      },
      {
        noAck: true,
      }
    );

    console.log("Connected to RabbitMQ for consuming");
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error);
  }
};

connectToRabbitMQ();

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`WebSocket running on port ${PORT}`);
});
