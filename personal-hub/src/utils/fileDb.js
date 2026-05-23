import fs from "node:fs";
import path from "node:path";

function reading(fileName) {
  let ar = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "data", fileName), "utf-8"))
  console.log(Array.isArray(ar));
  return ar
}
function writing(fileName, modifie) {
  fs.writeFileSync(
    path.resolve(path.resolve(process.cwd(), "data", fileName)),
    JSON.stringify(modifie),
  );
}
export { reading, writing };
