import { reading, writing } from "../utils/fileDb.js";
import AppError from "../utils/AppError.js";
const habit = "habits.json";

const getHabits = async () => {
  let newFile = reading(habit);
  if (!newFile) throw new AppError("Invalid file!!!");
  return newFile;
};
const findHabits = async (id) => {
  let noteID = reading(habit).find((i) => i.id === id);
  return noteID ? noteID : null;
};

const createHabit = async (note) => {
  let noteFile = reading(habit);
  writing(habit, [...noteFile, note]);
  return note;
};

const updateHabit = async (id, changes) => {
  let arrFile = reading(habit);
  let noteID = arrFile.findIndex((i) => i.id === id);
  if (noteID === -1) throw new AppError("Invalid file!!!");
  arrFile[noteID] = { ...arrFile[noteID], ...changes };
  writing(habit, arrFile);
  return arrFile[noteID];
};

const deleteHabit = async (id) => {
  let readFile = reading(habit);
  let newFile = readFile.filter((i) => i.id !== id);
  writing(habit, newFile);
  return readFile.length != newFile.length ? true : false;
};

export { getHabits, findHabits, createHabit, updateHabit, deleteHabit };
