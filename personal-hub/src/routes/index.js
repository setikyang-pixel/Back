import AuthRout from "./auth.routes.js";
import HabitRout from "./habits.routes.js";
import NoteRout from "./notes.routes.js";
import BookRout from "./books.routes.js";
import { Router } from "express"
const app = Router()
app.use("/auth",AuthRout)
app.use("/habits",HabitRout)
app.use("/notes",NoteRout)
app.use("/books",BookRout)

export default app