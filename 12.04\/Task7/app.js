const path = require("node:path");
const fs = require("node:fs");
let { arr } = require("./package.js");
for (const i of arr) {
  let add = path.join(__dirname, i);
  fs.mkdir(add, { recursive: true }, (e, d) => {
    if (e) console.log(` Error: ${e.message}`);
    else console.log(`is normal"${i}".`);
  });
}
