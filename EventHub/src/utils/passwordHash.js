import bcr from "bcrypt";
export const hashPassword = async (password) => await bcr.hash(password,10);
export const verifyPassword = async (password,oldPass) => await bcr.compare(password,oldPass);