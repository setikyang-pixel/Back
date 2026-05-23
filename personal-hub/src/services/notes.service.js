import {
  getNotes,
  findNoteId,
  createNote,
  updateNote,
  deleteNote,
} from "../models/note.model.js";
import AppError from "../utils/AppError.js";
import UniqID from "../utils/id.js";

const getAllNotes = async (ownerId, tag) => {
  let arr = await getNotes();
  if (!arr) throw new AppError("Invalid file!!!");
  let userNotes = arr.filter((i) => i.ownerId === ownerId);
  if (tag) userNotes = userNotes.filter((i) => i.tags && i.tags.includes(tag));
  return userNotes;
};

const getNoteById = async (ownerId, id) => {
  let arr = await getNotes();
  let note = arr.find((i) => i.id == id && i.ownerId == ownerId);
  if (!note) throw new AppError("Invalid file!!!");
  return note;
};

const createNSer = async (ownerId, payload) => {
  let fullNote = {
    id: UniqID(),
    ownerId: ownerId,
    title: payload.title || "Untitled",
    body: payload.body || "",
    tags: payload.tags || [],
  };
  return await createNote(fullNote);
};

const updateNSer = async (id,ownerId,payload) => {
  let objId = await findNoteId(id);
  if (!objId) throw new AppError("Invalid file!!!");
  if (objId.ownerId !== ownerId) throw new AppError("Unauthorized", 403);
  const updatedPayload = {
	id: UniqID(),
    ...payload
  };

  return await updateNote(objId.id, updatedPayload);
};

const removeNSer = async (id, ownerId) => {
  let objId = await findNoteId(id);
  if (!objId) throw new AppError("Invalid file!!!");
  if (objId.ownerId !== ownerId) throw new AppError("Unauthorized", 403);
  return await deleteNote(objId.id);
};

export { getAllNotes, getNoteById, createNSer, updateNSer, removeNSer };
