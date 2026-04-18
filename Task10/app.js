const path = require("node:path");
const fs = require("node:fs");
let {size} = require("./size.js");
let arr = fs.readdirSync(path.resolve(__dirname,"folder"))
size(arr)