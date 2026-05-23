import AppError from "../utils/AppError.js";
import { reading, writing } from "../utils/fileDb.js";
const books = "books.json";

const getBooks = async () => {
  let newFile = reading(books);
  if (!newFile) throw new AppError("Invalid file!!!");
  return newFile;
};
const findBooks = async (id) => {
  let noteID = reading(books).find((i) => i.id === id);
  return noteID ? noteID : null;
};

const createBook = async (note) => {
  let noteFile = reading(books);
  writing(books, [...noteFile, note]);
  return note;
};

const updateBook = async (id, changes) => {
  let arrFile = reading(books);
  let noteID = arrFile.findIndex((i) => i.id === id);
  if (noteID === -1) throw new AppError("Invalid file!!!");
  arrFile[noteID] = { ...arrFile[noteID], ...changes };
  writing(books, arrFile);
  return arrFile[noteID];
};

const deleteBook = async (id) => {
  let readFile = reading(books);
  let newFile = readFile.filter((i) => i.id !== id);
  writing(books, newFile);
  return readFile.length != newFile.length ? true : false;
};

export { getBooks, findBooks, createBook, updateBook, deleteBook };
