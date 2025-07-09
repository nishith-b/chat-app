import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import chatRoutes from "./routes/chat-routes.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use("/api/v1", chatRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
