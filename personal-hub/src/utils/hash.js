import hasing, { hashSync } from "bcrypt";

async function hashPassword(pass) {  
  console.log(await hasing.hash(pass, 10));
  
  return await hasing.hash(pass, 10);
}
async function verifyPassword(pass, hash) {
  return hasing.compareSync(pass, hash);
}

export {hashPassword,verifyPassword}