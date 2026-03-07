import mongoose from "mongoose";


let connected = false;
export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  // if the database is already connected, return
  if(connected) {
    console.log("MongoDB is already connected");
    return;
  }

  // Connect to MongoDB
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}