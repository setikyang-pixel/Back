import UserMid from "../middlewares/auth.middleware.js";
import express from "express";
import {
  getAllHabits,
  getHabitById,
  createNewHabit,
  updateHabit,
  removeHabit,
  checkInHabit,
} from "../controllers/habits.controller.js";
import { createdNewBook } from "../controllers/books.controller.js";
const rout = express.Router();

rout.get("/", UserMid, getAllHabits);
rout.get("/:id", UserMid, getHabitById);
rout.post("/", UserMid, createNewHabit);
rout.put("/:id", UserMid, updateHabit);
rout.delete("/:id", UserMid, removeHabit);
export default rout;
