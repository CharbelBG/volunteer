import mongoose from "mongoose";

mongoose.set("strictQuery", true);
const connectDB = async () => {
  try {
    const connect = mongoose.connect(process.env.MONGO_URI);
    console.log("mongo DB is connected");
  } catch (err) {
    console.log(err);
  }
};
export default connectDB;
