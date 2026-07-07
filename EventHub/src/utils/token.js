import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import crypto from "crypto";

export const createToken = (obj, exp) =>
  jwt.sign(obj, env.jwtSecret, {
    expiresIn: exp,
  });
export const verifyToken = (token) => jwt.verify(token, env.jwtSecret);
export const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");
