const path = require("node:path");
const fs = require("node:fs");
const { ad } = require("./index.js");
let add = path.join(__dirname, "pas.env");
fs.readFile(add, "utf-8", (e, d) => {
  if (e) {
    throw e;
  } else {
    console.log(ad(d));
  }
});
