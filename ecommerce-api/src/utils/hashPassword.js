import bcrypt from "bcrypt";
export const hashPassword =  async (password) => bcrypt.hash(password, 10);
export const verifyPassword =  async (pass,oldPass) => bcrypt.compare(pass,oldPass);
