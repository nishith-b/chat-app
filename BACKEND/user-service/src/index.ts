import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { createClient } from "redis";
import userRoutes from "./routes/user-routes.js";
import { connectRabbitMQ } from "./config/rabbitmq.js";

dotenv.config();

connectDB();

connectRabbitMQ();

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient
  .connect()
  .then(() => console.log("Connected To Redis"))
  .catch((error) => console.log("Error Occured", error));

const app = express();

app.use("api/v1", userRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
