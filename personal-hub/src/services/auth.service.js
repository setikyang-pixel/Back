import {
  findUserName,
  findUserById,
  createUser,
} from "../models/user.model.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import { signToken } from "../utils/token.js";
import uniqID from "../utils/id.js";
import AppError from "../utils/AppError.js";

const register = async (username, pass) => {
  let userElem = await findUserName(username);
  if (userElem) throw AppError("Are you registered!!!", 409);
  let user = await createUser({
    id: uniqID(),
    username: username,
    passwordHash: await hashPassword(pass),
    created: new Date().toISOString(),
  });
  return { id: user.id, username: user.username, createdAt: user.createdAt };
};

const login = async (username, pass) => {
  let users = await findUserName(username);
  if (!users) throw AppError("Invalid user!!!", 401);
  if (!(await verifyPassword(pass, users.passwordHash)))
    throw AppError("Invalid password!!!", 409);
  let token = signToken({ id: users.id, username: users.username });
  return { token, user: { id: users.id, username: users.username } };
};

const getMe = (id) => {
  let idUser = findUserById(id);
  if (!idUser) throw new AppError("Is our id user is nothing!!!");
  return idUser;
};

export { register, login, getMe };
