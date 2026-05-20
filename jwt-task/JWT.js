import express from "express";
import jwt from "jsonwebtoken";
import fs from "node:fs";
import path from "node:path";
import cors from "cors";
import bcrypt, { hash } from "bcrypt";
import "dotenv/config";
import { json } from "node:stream/consumers";
const exp = express();
exp.use(express.json());
exp.use(express.static("public"));
exp.use(express.urlencoded());
exp.use(
    cors({
        origin: "http://127.0.0.1:5500",
    }),
);
const envP = process.env.JWT_SECRET;
let file = JSON.parse(
  fs.readFileSync(path.resolve("./usersJSON.json"), "utf-8"),
);

exp.post("/api/register", (req, res) => {
  let { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "No email/password!!!" });
  let user = file.findIndex((i) => i.email === email);
  if (user !== -1)
    return res.status(400).json({ message: "You are registered!!!" });
  const hashing = bcrypt.hashSync(password, 10);
  fs.writeFileSync(
    path.resolve("./usersJSON.json"),
    JSON.stringify([...file, { email: email, password: hashing }]),
  );
  res.status(200).json({ message: "Good" });
});

exp.post("/api/login", (req, res) => {
  let { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "No email/password!!!" });
  let userPass = file.find((i) => i.email === email);
  if (!bcrypt.compareSync(password, userPass.password))
    return res.status(401).json({ message: "Wrong Password!!!" });
  let token = jwt.sign({ email }, envP, { expiresIn: "15m" });
  res.status(200).json({ token: token });
});

function user(req, res, next) {
  let tok = req.headers.authorization;
  if (!tok) return res.status(404).send("Bad Request");
  try {
    let verify = jwt.verify(tok, envP);
    let user = file.find((i) => i.email === verify.email);
    req.user = user;
    console.log(user);
    
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token expired" });
  }
}

exp.get("/api/me", user, (req, res) => {
  res.status(200).json({ user : req.user });
});

exp.listen(3001);
