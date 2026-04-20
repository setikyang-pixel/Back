const files = require("node:fs");
const path = require("node:path");
const fullAddres = path.join(__dirname, "user.json");
let obj = files.readFileSync(fullAddres);
let obj2 = JSON.parse(obj);
let obj3 = {};
for (const i in obj2) {
  let str = [i.split("_")];
  let n = str[0][1][0].toUpperCase();
  n = str[0][0] + n + str[0][1].slice(1);
  obj3[n] = obj2[i];
}
files.writeFileSync(fullAddres, JSON.stringify(obj3));
