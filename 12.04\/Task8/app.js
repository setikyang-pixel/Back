const path = require("node:path");
const fs = require("node:fs");
let {rename} = require("./rename.js");
const add = path.join(__dirname , "folderTXT")
let arr = fs.readdirSync(add)
for (const i of arr) {
    const oldPath = path.join(add,i)
    const newPath = path.join(add,rename(i))
    fs.rename(oldPath,newPath,(e,d)=>{
        if(e) console.log("error");
        else console.log("good");
    })
}