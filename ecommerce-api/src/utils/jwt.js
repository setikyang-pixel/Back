import jwt from "jsonwebtoken";
import "dotenv/config";

export const createJWT = (obj) =>
  jwt.sign(obj, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRESIN_JWT,
  });
export const verifyJWT = (token) => jwt.verify(token, process.env.JWT_SECRET);
