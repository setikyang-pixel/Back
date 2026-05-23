import {
  getAllNotes,
  getNoteById,
  createNSer,
  updateNSer,
  removeNSer,
} from "../services/notes.service.js";
import AppError from "../utils/AppError.js";

const getAll = async (req, res, next) => {
  try {
    const { tag } = req.query;
    const { id:userId } = req.user;
    const note = await getAllNotes(userId, tag);
    res.json(note);
  } catch (err) {
    next(err);
  }
};

const getNoteId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    const note = await getNoteById(id, userId);
    res.json(note);
  } catch (err) {
    next(err);
  }
};
const createNote = async (req, res, next) => {
  try {
    const payload = req.body;
    const { id: userId } = req.user;
    const note = await createNSer(userId, payload);
    res.json(note);
  } catch (err) {
    next(err);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const {id} = req.params;
    const payload = req.body;
    const { id: userId } = req.user;
    const note = await updateNSer(userId,id,payload);
    res.json(note);
  } catch (err) {
    next(err);
  }
};

const removeNote = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { id: userId } = req.user;
    const note = await removeNSer(userId, id);
    res.json(note);
  } catch (err) {
    next(err);
  }
};

export { getAll, getNoteId, createNote, updateNote, removeNote };
