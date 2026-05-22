import env from "../config/env.js";
import express from "express";
import AppError from "../utils/AppError.js";
import cookieParser from "cookie-parser.js";
let x = express();
x.use(cookieParser());
let CookieName = env.COOKIE_NAME;
const userMid = (req, res, next) => {
  try {
    let user = req.headers.authorization.split(" ")[1] || req.cookie.CookieName;
    if (!user) throw AppError("Invalid Argumnets!!!", 400);
    let userLog = Buffer.from(user, "base64").toString().split(":");
    req.user = userLog;
    next();
  } catch (err) {
    next(err);
  }
};

x.post("/aut/reg", userMid);
x.listen(3001);
