const path = require("node:path");
const fs = require("node:fs");
const { title } = require("./generator.js");
let name = process.argv;
let add = path.join(__dirname, name[2]);
fs.writeFile(add, title(name[2]), (e, d) => {
  if (e) throw e;
  return d;
});
