import type { Note } from "src/domains/notes/Note";

export interface EditorPageState {
  focus: string;
  focusedNoteId: string;
  notes: Note[];
  selectedNoteId: string;
}

export function createEditorPageState(): EditorPageState {
  return {
    focus: "",
    focusedNoteId: "",
    notes: [],
    selectedNoteId: "",
  };
}

export function findNextNote(notes: Note[], noteId: string): Note | null {
  if (!noteId) {
    return notes[0] ?? null;
  }

  const curIndex = notes.findIndex((v) => v.id === noteId);
  if (curIndex < 0) {
    throw new Error(`Note ${noteId} not found`);
  }

  const nextNote = notes[curIndex + 1] ?? null;
  return nextNote;
}

export function findPrevNote(notes: Note[], noteId: string): Note | null {
  if (!noteId) {
    return notes[0] ?? null;
  }

  const curIndex = notes.findIndex((v) => v.id === noteId);
  if (curIndex < 0) {
    throw new Error(`Note ${noteId} not found`);
  }

  const prevNote = notes[curIndex - 1] ?? null;
  return prevNote;
}
