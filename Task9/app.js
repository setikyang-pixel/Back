const path = require("node:path");
const fs = require("node:fs");
let { copy } = require("./copyFile.js");
let arr = fs.readdirSync(path.resolve(__dirname, "folderTXT"));
copy(arr);