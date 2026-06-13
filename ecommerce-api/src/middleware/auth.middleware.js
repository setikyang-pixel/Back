import express from "express";

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
  const { email} = req.body;
  if (!email) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }
  next();
};

export { loginMiddle,registerMiddle, meMiddle};
