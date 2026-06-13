import express from "express";
import prisma from "../config/db.js";
import { loginMiddle, registerMiddle,meMiddle } from "../middleware/auth.middleware.js";
import {
  loginControler,
  meControler,
  registerControler,
} from "../controllers/authController.js";
const auth = express.Router();

auth.get("/me", meMiddle, meControler);
auth.post("/login", loginMiddle, loginControler);
auth.post("/register", registerMiddle, registerControler);

export default auth;
