import hasing, { hashSync } from "bcrypt";

async function hashPassword(pass) {
  return hasing.hash(pass, 10);
}
async function verifyPassword(pass, hash) {
  return hasing.compareSync(pass, hash);
}

export {hashPassword,verifyPassword}