import { createNote, type Note } from "./Note";

export async function getUserNotes(): Promise<Note[]> {
  const n = 100;
  const notes: Note[] = [];
  for (let i = 0; i < n; i++) {
    const item = createNote({
      id: Math.random().toFixed(32).slice(2),
      title: `Item ${i + 1}`,
    });
    notes.push(item);
  }
  return notes;
}