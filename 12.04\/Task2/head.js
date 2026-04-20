const fs = require("node:fs")
const {filter} = require("./filterFile.js")
let ext = process.argv;
fs.readdir(__dirname,(e,d)=>{
    if(e) throw e;
    filter(d,ext)
})