import mongoose from "mongoose";

export const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn("MONGODB_URI is not set. API will run with in-memory demo storage.");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.warn("MongoDB connection failed. Falling back to in-memory demo storage.");
    console.warn(error.message);
  }
};

export const isDatabaseConnected = () => mongoose.connection.readyState === 1;
