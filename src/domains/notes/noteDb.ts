import { createNote, type Note } from "./Note";

const STORAGE_KEY = "shortcuts-demo://notes";

export async function getUserNotes(): Promise<Note[]> {
  const json = window.localStorage.getItem(STORAGE_KEY);
  const data = json ? JSON.parse(json) : [];
  if (!Array.isArray(data)) {
    throw new Error("Invalid data");
  }

  const notes = data.map((v) => createNote(v));
  return notes;
}

export async function saveUserNotes(notes: Note[]): Promise<void> {
  const json = JSON.stringify(notes);
  window.localStorage.setItem(STORAGE_KEY, json);
}
