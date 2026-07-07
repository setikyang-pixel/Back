import mongo from "mongoose";
import { env } from "./env.js";

async function ConnectDB() {
  try {
    const connect = await mongo.connect(env.mongoUrl);
    console.log("Database (MongoDB) is connected...");
  } catch (err) {
    console.log("Database is disconnected!!!");
    process.exit(1);
  }
}

export default ConnectDB;
