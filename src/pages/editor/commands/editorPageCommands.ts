import { toCommandDefinitions } from "../../../domains/commands/CommandDefinition";
import { execCommand } from "../../../domains/commands/commands";
import { createNote } from "../../../domains/notes/Note";
import { findNextNote, findPrevNote } from "../EditorPageState";
import { addNoteState, editorPageStateStore, getEditorPageState } from "../editorPageStateStore";

export type EditorPageCommandType = typeof editorPageCommands[number]['command'];

export const editorPageCommands = toCommandDefinitions([
  {
    action: () => {
      const note = createNote({
        id: Math.random().toFixed(32).slice(2),
        title: "New note",
      });
  
      addNoteState(note);
    },
    command: "note:new",
    title: "Create a new note",
  },
  {
    action: () => {
      const el = document.activeElement;
      if (el instanceof HTMLElement) {
        el.blur();
      }

      editorPageStateStore.update((v) => ({
        ...v,
        focus: "",
      }));
    },
    command: "focusNone",
    title: "Remove focus",
  },
  {
    action: () => {
      editorPageStateStore.update((v) => ({
        ...v,
        focus: "noteBody",
      }));
    },
    command: "focusNoteBody",
    title: "Focus note body",
  },
  {
    action: () => {
      editorPageStateStore.update((v) => ({
        ...v,
        focus: "noteTitle",
      }));
    },
    command: "focusNoteTitle",
    title: "Focus note title",
  },
  {
    action() {
      editorPageStateStore.update((v) => ({
        ...v,
        focus: 'noteList',
      }));
    },
    command: "focusFileList",
    title: "Focus file list", // TODO s/file/note/
  },
  {
    action() {
      const { focusedNoteId, notes } = getEditorPageState();
      const prevNote = findPrevNote(notes, focusedNoteId);
      if (!prevNote) {
        return;
      }

      editorPageStateStore.update((v) => ({
        ...v,
        focusedNoteId: prevNote.id,
      }));
    },
    command: "moveToPrevNote",
    title: "Move to prev note",
  },
  {
    action() {
      const { focusedNoteId, notes } = getEditorPageState();
      const nextNote = findNextNote(notes, focusedNoteId);
      if (!nextNote) {
        return;
      }

      editorPageStateStore.update((v) => ({
        ...v,
        focusedNoteId: nextNote.id,
      }));
    },
    command: "moveToNextNote",
    title: "Move to next note",
  },
  {
    action() {
      const { focusedNoteId } = getEditorPageState();

      editorPageStateStore.update((v) => ({
        ...v,
        focus: 'noteBody',
        selectedNoteId: focusedNoteId,
      }));
    },
    command: "openItemInFocusedNoteList",
    title: "Open focused item",
  },
  {
    action() {
      editorPageStateStore.update((state) => {
        const { focusedNoteId, notes, selectedNoteId } = state;

        const nextNote =
          findNextNote(notes, focusedNoteId) ??
          findPrevNote(notes, focusedNoteId);
        const newFocusedNoteId = nextNote?.id ?? "";

        const newNotes = state.notes.filter((v) => v.id !== focusedNoteId);

        const newSelectedNoteId = selectedNoteId === focusedNoteId
          ? "" :
          selectedNoteId;

        return {
          ...state,
          focusedNoteId: newFocusedNoteId,
          notes: newNotes,
          selectedNoteId: newSelectedNoteId,
        };
      });
    },
    command: "deleteNoteFocusedInList",
    title: "Delete focused item",
  },
]);

export function execEditorPageCommand(command: EditorPageCommandType): void {
  execCommand(editorPageCommands, command);
}
