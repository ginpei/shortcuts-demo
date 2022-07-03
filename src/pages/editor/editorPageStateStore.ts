import type { Note } from "src/domains/notes/Note";
import { getUserNotes } from "../../domains/notes/noteDb";
import { writable } from "svelte/store";

export interface EditorPageState {
  notes: Note[];
  selectedNoteId: string;
}

export const editorPageStateStore = writable<EditorPageState>({
  notes: [],
  selectedNoteId: "",
});

export async function initEditorPageStateStore() {
  const notes = await getUserNotes();
  setEditorPageNotes(notes);
}

export function setEditorPageNotes(notes: Note[]) {
  editorPageStateStore.update((values) => {
    const selectedNoteId = notes.some((v) => values.selectedNoteId === v.id)
      ? values.selectedNoteId
      : "";

    return ({
      notes,
      selectedNoteId,
    });
  });
}

export function setNoteState(note: Note): void {
  editorPageStateStore.update((values) => {
    const index = values.notes.findIndex((v) => v.id === note.id);
    if (index < 0) {
      throw new Error("Note gone");
    }

    values.notes[index] = note;

    return values;
  });
}

export function addNoteState(note: Note): void {
  editorPageStateStore.update((values) => {
    values.notes.push(note);
    return values;
  });
}
