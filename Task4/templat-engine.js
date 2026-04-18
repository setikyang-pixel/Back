const path = require("node:path")
const fs = require("node:fs")
const {app} = require("./app.js")
let arr = {name:"Arsen",year:"333"}
const filesName = process.argv[2] || "file.txt";
const add = path.join(__dirname,filesName)
let files = fs.readFileSync(add,"utf-8")
fs.writeFileSync(add,app(files,arr))
