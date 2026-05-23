import {
  registerHandler,
  loginHandler,
  logoutHandler,
  Me,
} from "../controllers/auth.controller.js";
import {Router} from "express";
import UserMid from "../middlewares/auth.middleware.js";
const rout = Router();

rout.post("/register", registerHandler);
rout.post("/login", loginHandler);
rout.post("/logout", UserMid, logoutHandler);
rout.get("/me", UserMid, Me);

export default rout;

