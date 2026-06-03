import exp, { urlencoded } from "express";
import pool from "./pool.js"
import bookRoute from "./Route/book.route.js";
import authRoute from "./Route/Author.route.js";
import customRoute from "./Route/Custom.route.js";

const app = exp();
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));

pool
  .connect()
  .then(() => console.log("Pool is a good..."))
  .catch((err) => console.log(err));

app.use("/books",bookRoute)
app.use("/auth",authRoute)
app.use("/custom",customRoute)

app.listen(3001, () => console.log("Server is connected..."));