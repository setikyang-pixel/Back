import fs from "node:fs";
import path from "node:path";

function reading(fileName) {
  return JSON.parse(
    fs.readFileSync(path.resolve(`../../data/${fileName}`), "utf-8"),
  );
}
function writing(fileName, modifie) {
  fs.writeFileSync(
    path.resolve(`../../data/${fileName}`),
    JSON.stringify(modifie),
  );
}
export {reading,writing}