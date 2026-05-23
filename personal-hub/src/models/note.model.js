import AppError from "../utils/AppError.js";
import { reading, writing } from "../utils/fileDb.js";
const notes = "notes.json";

const getNotes = async () => reading(notes);

const findNoteId = async (id) => {
  let noteID = reading(notes).find((i) => i.id === id);
  return noteID ? noteID : null;
};

const createNote = async (note) => {
  let noteFile = reading(notes);
  writing(notes, [...noteFile, note]);
  return note;
};

const updateNote = async (id, changes) => {
  let arrFile = reading(notes);
  let noteID = arrFile.findIndex((i) => i.id === id);
  if (noteID === -1) throw new AppError("Invalid file!!!");
  arrFile[noteID] = { ...arrFile[noteID], ...changes };
  writing(notes, arrFile);
  return arrFile[noteID];
};

const deleteNote = async (id) => {
  let readFile = reading(notes);
  let newFile = readFile.filter((i) => i.id !== id);
  writing(notes, newFile);
  return readFile.length != newFile.length ? true : false;
};

export { getNotes, findNoteId, createNote, updateNote, deleteNote };
