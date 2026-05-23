import {
  getAll,
  getBookID,
  create,
  update,
  remove,
} from "../services/books.service.js";
import AppError from "../utils/AppError.js";

const getAllBook = async (req, res, next) => {
  try {
    const { status } = req.query;
    const { id: userId } = req.user;
    const books = await getAll(userId, status);
    res.json(books);
  } catch (err) {
    next(err);
  }
};

const getBooksId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    const book = await getBookID(id, userId);
    res.json(book);
  } catch (err) {
    next(err);
  }
};

const createdNewBook = async (req, res, next) => {
  try {
    const payload = req.body;
    const { id: userId } = req.user;
    const newBook = await create(userId, payload);
    res.json(newBook);
  } catch (err) {
    next(err);
  }
};

const updateBooks = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const { id: userId } = req.user;
    const updatedBook = await update(id, userId, payload);
    res.json(updatedBook);
  } catch (err) {
    next(err);
  }
};

const removeBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    const result = await remove(id, userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export { getAllBook, getBooksId, createdNewBook, updateBooks, removeBook };
