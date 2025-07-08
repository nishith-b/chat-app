import amqp from "amqplib";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect({
      protocol: "amqp",
      hostname: process.env.RabbitMQ_Hostname,
      port: 5672,
      username: process.env.RabbitMQ_Username,
      password: process.env.RabbitMQ_Password,
    });

    channel = await connection.createChannel();
    console.log("Connected To RabbitMQ!");
  } catch (error) {
    console.log("Failed To Connect To RabbitMQ", error);
  }
};
