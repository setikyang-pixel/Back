import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve("../../.env") });
export default {
  PORT: process.env.PORT || 3001,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES: process.env.JWT_EXPIRES || "15m",
  COOKIE_NAME: process.env.COOKIE_NAME
};