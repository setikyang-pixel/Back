import { verifyJWT } from "../utils/jwt.js";

export const adminOnly = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }
    const user = verifyJWT(token);
    if (user.role !== "admin") {
      return res.status(403).json({
        error: "Admin access required",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
};
