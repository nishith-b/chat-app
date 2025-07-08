import mongoose from "mongoose";

const connectDB = async () => {
  const url = process.env.MONGO_URI;
  if (!url) {
    throw new Error("MONGO_URI is not defined in env variables");
  }

  try {
    await mongoose.connect(url, {
      dbName: "Chat-Microservice App",
    });
    console.log("Connected To MongoDB!");
  } catch (error) {
    console.error("Error Occured! Failed to Connect to MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
