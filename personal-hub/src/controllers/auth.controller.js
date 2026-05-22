import obj from "../config/env.js";
import { register, login, getMe } from "../services/auth.service.js";
import cookie from "cookie-parser";
let CookieName = obj.COOKIE_NAME;
const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  secure: false,
  maxAge: 24 * 60 * 60 * 1000,
};

async function registerHandler(req, res, next) {
  try {
    let { username, password } = req.body;
    const user = await register(username, password);
    req.user = user;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

async function loginHandler(req, res, next) {
  try {
    let { username, password } = req.body;
    let { token, user } = await login(username, password);
    res.cookie(CookieName, token, COOKIE_OPTIONS);
    return res.json({ token, user });
  } catch (err) {
    next(err);
  }
}

async function logoutHandler(req, res, next) {
  try {
    res.clearCookie(CookieName);
    res.json({ message: "Logged out" });
  } catch (err) {
    next(err);
  }
}

async function Me(req, res, next) {
  try {
    const usID = req.user.id;
    let user = await getMe(usID);
    res.json(user);
  } catch (err) {
    next(err);
  }
}
export {registerHandler,loginHandler,logoutHandler,Me}