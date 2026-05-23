import {
  getBooks,
  findBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../models/book.model.js";
import AppError from "../utils/AppError.js";
import UniqID from "../utils/id.js";

const getAll = async (ownerId, status) => {
  const books = await getBooks();
  let filtered = books.filter((i) => i.ownerId == ownerId);
  if (status) filtered = filtered.filter((i) => i.status === status);
  return filtered;
};

const getBookID = async (id, ownerId) => {
  let book = await findBooks(id);
  if (!book) throw new AppError("Not found", 404);
  if (book.ownerId !== ownerId) throw new AppError("Unauthorized", 403);
  return book;
};

const create = async (ownerId, payload) => {
  const now = new Date().toISOString();
  let newFile = {
    id: UniqID(),
    ownerId,
    title: payload.title,
    author: payload.author,
    status: payload.status,
    rating: payload.rating,
  };
  return await createBook(newFile);
};

const update = async (id, ownerId, payload) => {
  let file = await findBooks(id);
  if (!file) throw new AppError("Invalid!!!", 404);
  if (ownerId !== file.ownerId) throw new AppError("Unauthorized!!!", 403);
  const currentStatus = payload.status || file.status;
  const currentRating =
    payload.rating !== undefined ? payload.rating : file.rating;
  if (currentRating && currentStatus !== "finished")
    throw new AppError("Invalid file!!!", 400);
  let UpFile = {
    ...file,
    ...payload,
    id: file.id,
    ownerId: file.ownerId,
  };
  return await updateBook(file.id, UpFile);
};

const remove = async (id, ownerId) => {
  let file = await findBooks(id);
  if (!file) throw new AppError("Invalid!!!", 404);
  if (ownerId !== file.ownerId) throw new AppError("Unauthorized!!!", 403);
  return await deleteBook(ownerId, id);
};

export { getAll, getBookID, create, update, remove };
