import type { Note } from "src/domains/notes/Note";
import { get, writable } from "svelte/store";
import { getUserNotes } from "../../domains/notes/noteDb";
import { createEditorPageState, type EditorPageState } from "./EditorPageState";

export const editorPageStateStore = writable<EditorPageState>(createEditorPageState());

export function getEditorPageState(): Readonly<EditorPageState> {
  return get(editorPageStateStore);
}

export async function initEditorPageStateStore() {
  const notes = await getUserNotes();
  setEditorPageNotes(notes);
}

export function setEditorPageNotes(notes: Note[]) {
  editorPageStateStore.update((values) => {
    const focusedNoteId = notes.some((v) => values.focusedNoteId === v.id)
      ? values.focusedNoteId
      : "";

    const selectedNoteId = notes.some((v) => values.selectedNoteId === v.id)
      ? values.selectedNoteId
      : "";

    return ({
      ...values,
      focusedNoteId,
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
