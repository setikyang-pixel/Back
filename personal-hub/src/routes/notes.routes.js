import UserMid from "../middlewares/auth.middleware.js";
import express from "express";
import {
  getAll,
  getNoteId,
  createNote,
  updateNote,
  removeNote,
} from "../controllers/notes.controller.js";
const rout = express.Router();

rout.get("/", UserMid, getAll)
rout.get("/:id", UserMid, getNoteId);
rout.post("/", UserMid, createNote);
rout.put("/:id", UserMid, updateNote);
rout.delete("/:id", UserMid, removeNote);
export default rout;
