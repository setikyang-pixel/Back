const path = require("node:path");
const fs = require("node:fs");
exports.size = (arr) => {
  const logs = path.resolve('folder')
  for (const i of arr) {
    let n = fs.statSync(logs,i).size
    if(n < 5000){
      let kar = fs.readFileSync(path.join(logs,i),"utf-8")
      fs.writeFileSync(path.join(logs,'config.json'),JSON.stringify(kar,null,2))
    }
  }
};