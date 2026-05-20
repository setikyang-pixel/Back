import express from "express";
import fs from "node:fs";
import path from "node:path";
let file = JSON.parse(fs.readFileSync(path.resolve("./users.json"), "utf-8"));
const exp = express();
exp.use(express.json());

function UserReading(req, res, next) {
  let userKey = req.headers["apikey"];
  let us = file.findIndex((i) => i.apikey === userKey);
  if (us !== -1) return next();
  res.status(401).send("No permission");
}

function UserPosted(perm) {
  return function (req, res, next) {
    let head = req.headers["apikey"];
    let userIndex = file.findIndex((i) => i.apikey === head);
    let usersPerm = file[userIndex].permission;
    let UsersWorked = usersPerm.find((i) => i === perm);
    if (!UsersWorked) {
      return res.status(403).send("No users permission");
    }
    next();
  };
}

exp.get("/api/products", UserReading, UserPosted("read"), (req, res) => {
  res.sendStatus(200);
});
exp.post("/api/products", UserReading, UserPosted("write"), (req, res) => {
  res.sendStatus(200);
});

exp.get("/api/status", (req, res) => {
  res.status(200).send("server is up");
});

exp.listen(3001);
