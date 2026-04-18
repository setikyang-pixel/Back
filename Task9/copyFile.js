const path = require("node:path");
const fs = require("node:fs");
exports.copy = (arr) => {
  for (const i of arr) {
    let par = path.parse(i);
    let newfile = par.name + "_backup" + par.ext;
    let add = path.resolve(newfile);
    fs.writeFileSync(path.join(par.dir,"folderTXT",newfile), fs.readFileSync(path.resolve('folderTXT',i), "utf-8"));
  }
};
