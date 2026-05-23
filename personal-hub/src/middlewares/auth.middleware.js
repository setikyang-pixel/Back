import env from "../config/env.js";
import AppError from "../utils/AppError.js";
let CookieName = env.COOKIE_NAME;

const userMid = (req, res, next) => {
  try {
    let user =
      req.headers.authorization.split(" ")[1] || req.cookies[CookieName];
    if (!user) throw new AppError("Invalid Argumnets!!!", 400);
    let userLog = Buffer.from(user, "base64").toString().split(":");
    req.user = userLog;
    next();
  } catch (err) {
    next(err);
  }
};
export default userMid