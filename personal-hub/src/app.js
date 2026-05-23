import cookieParser from "cookie-parser";
import express from "express";
import ErrorHandling from "./middlewares/error.middleware.js";
import notFound from "./middlewares/notFound.middleware.js";
import rout from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api", rout);
app.use(notFound);
app.use(ErrorHandling);
export default app;
