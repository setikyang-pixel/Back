import express from "express";
import cookieParser from "cookie-parser";
import fullEcomerce from "./routes/fullEcomerce.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/main", fullEcomerce);
export default app;
