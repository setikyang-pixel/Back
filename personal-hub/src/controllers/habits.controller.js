import {
  getAll,
  getHabitID,
  create,
  update,
  remove,
  checkIn,
} from "../services/habits.service.js";

const getAllHabits = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const habits = await getAll(userId);
    res.json(habits);
  } catch (err) {
    next(err);
  }
};

const getHabitById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    const habit = await getHabitID(id, userId);
    res.json(habit);
  } catch (err) {
    next(err);
  }
};

const createNewHabit = async (req, res, next) => {
  try {
    const payload = req.body;
    const { id: userId } = req.user;
    const newHabit = await create(userId, payload);
    res.json(newHabit);
  } catch (err) {
    next(err);
  }
};

const updateHabit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const { id: userId } = req.user;
    const updatedHabit = await update(id, userId, payload);
    res.json(updatedHabit);
  } catch (err) {
    next(err);
  }
};

const removeHabit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    const result = await remove(id, userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const checkInHabit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    const result = await checkIn(id, userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export {
  getAllHabits,
  getHabitById,
  createNewHabit,
  updateHabit,
  removeHabit,
  checkInHabit,
};
