import { reading, writing } from "../utils/fileDb.js";
const userJSON = "users.json";

const getUsers = () => reading(userJSON);
const findUserName = (username) => {
  let users = reading(userJSON).find((i) => i.username === username);
  return users ? users : null;
};
const findUserById = (id) => {
  let usersID = reading(userJSON).find((i) => i.id === id);
  return usersID ? usersID : null;
};
const createUser = (user) => {
  let newUser = reading(userJSON);
  writing(userJSON, [...newUser, user]);
  delete user.passwordHash;
  return user
};

export { getUsers, findUserName, findUserById, createUser };
