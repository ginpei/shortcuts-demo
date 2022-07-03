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
