import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import all from "./routes/index.js"
import { errorHandler } from "./middleware/errorHandler.js"
const app = express()

app.use(morgan("dev"))
app.use(helmet())
app.use(express.json());
app.use("/api",all)
app.use(errorHandler)

export default app