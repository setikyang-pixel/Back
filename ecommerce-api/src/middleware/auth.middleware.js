import express from "express";
import { verifyJWT } from "../utils/jwt.js";

const loginMiddle = async function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }
  next();
};
const registerMiddle = async function (req, res, next) {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({
      message: "Email, password,name are required",
    });
  }
  next();
};
const meMiddle = async function (req, res, next) {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  try {
    const decoded = verifyJWT(token);    
    req.user = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token." });
  }
};

export { loginMiddle, registerMiddle, meMiddle };
