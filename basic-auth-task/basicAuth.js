import express from "express";
import fs from "node:fs";
import path from "node:path";
const users = JSON.parse(
  fs.readFileSync(path.resolve("./users.json"), "utf-8"),
);
const exp = express();

function UserFilesCheck(req, res, next) {
  let user = req.headers.authorization;
  if (!user || !user.startsWith("Basic "))
    return res
      .status(401)
      .set("WWW-Authenticate", 'Basic realm="Secure Area"')
      .send("Authenticate is nemo");
  let base64 = user.split(" ")[1];
  let buf = Buffer.from(base64, "base64").toString().split(":");
  for (const i of users) {
    if (i.username == buf[0] && i.password == buf[1]) {
      return next();
    }
  }
  res.status(401).send("No such user exists!!!");
}

exp.post("/users", UserFilesCheck, (req, res) => {
  res.status(200).send("Great Surway");
});

exp.get("/public", (req, res) => {
  res.status(200).send("Welcome to our public page!");
});
exp.get("/items", (req, res) => {
  const { username, password } = req.headers;
  let findUser = users.findIndex((i) => i.username == username);
  if (findUser) {
    if (findUser.password === password) {
      return res.status(200).send(findUser);
    }
    return res.status(401).send("Invalid password!!!");
  }
  res.status(200).send("Welcome to our public page!");
});
exp.get("/private", (req, res) => {
  const { username, password } = req.headers;
  let findUser = users.findIndex((i) => i.username == username);
  if (findUser) {
    if (findUser.password === password) {
      return res.status(200).send({ username: "Enter the point" });
    }
    return res.status(401).send("Invalid password!!!");
  }
  res.status(200).send("Welcome to our public page!");
});

exp.listen(3001, () => {
  console.log("Server in Connected...");
});
