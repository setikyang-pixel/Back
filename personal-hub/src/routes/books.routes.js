import UserMid from "../middlewares/auth.middleware.js";
import express from "express";
import {
  getAllBook,
  getBooksId,
  createdNewBook,
  updateBooks,
  removeBook,
} from "../controllers/books.controller.js";
const rout = express.Router();

rout.get("/", UserMid, getAllBook);
rout.get("/:id", UserMid, getBooksId);
rout.post("/", UserMid, createdNewBook);
rout.put("/:id", UserMid, updateBooks);
rout.delete("/:id", UserMid, removeBook);
export default rout;
