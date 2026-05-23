import {
  getHabits,
  findHabits,
  createHabit,
  updateHabit,
  deleteHabit,
} from "../models/habit.model.js";
import AppError from "../utils/AppError.js";
import UniqID from "../utils/id.js";

const getAll = async (ownerId) => {
  const habits = await getHabits();
  if (!habits) throw new AppError("Invalid file!!!", 500);
  return habits.filter((i) => i.ownerId === ownerId);
};

const getHabitID = async (id, ownerId) => {
  let habit = await findHabits(id);
  if (!habit) throw new AppError("Invalid!!!", 404);
  if (habit.ownerId !== ownerId) throw new AppError("Unauthorized!!!", 403);
  return habit;
};

const create = async (ownerId, payload) => {
  let newFile = {
    id: UniqID(),
    ownerId: ownerId,
    name: payload.name,
    frequency: payload.frequency,
    checkIns: 0,
  };
  return await createHabit(newFile);
};

const update = async (id, ownerId, payload) => {
  let file = await findHabits(id);
  if (!file) throw new AppError("Invalid!!!", 404);
  if (ownerId !== file.ownerId) throw new AppError("Unauthorized!!!", 403);
  let newFile = {
    ...file,
    ...payload,
    id: file.id,
    ownerId: file.ownerId,
  };
  return await updateHabit(file.id, newFile);
};

const remove = async (id, ownerId) => {
  let file = await findHabits(id);
  if (!file) throw new AppError("Invalid!!!", 404);
  if (ownerId !== file.ownerId) throw new AppError("Unauthorized!!!", 403);
  return await deleteHabit(id, ownerId);
};

const checkIn = async (id, ownerId) => {
  let habit = await findHabits(id);
  if (!habit) throw new AppError("Invalid!!!", 404);
  if (habit.ownerId !== ownerId) throw new AppError("Unauthorized!!!", 403);
  habit.checkIns += 1;
  return await updateHabit(id, habit);
};

export { getAll, getHabitID, create, update, remove, checkIn };
