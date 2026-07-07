import app from "./app.js";
import ConnectDB from "./config/db.js";
import { env } from "./config/env.js";

ConnectDB()
  .then(() => {
    app.listen(env.port, () => {
      console.log("Server is a running.");
    });
  })
  .catch(() => {
    console.error("Connecting to MongoDB is a failed!!!");
    process.exit(1);
  });
