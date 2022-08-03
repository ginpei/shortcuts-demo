import { toCommandDefinitions } from "../../../domains/commands/CommandDefinition";
import { findNextNote, findPrevNote } from "../EditorPageState";
import { editorPageStateStore, getEditorPageState } from "../editorPageStateStore";

export const noteListCommands = toCommandDefinitions([
  {
    action() {
      editorPageStateStore.update((v) => ({
        ...v,
        focus: 'noteListPane',
      }));
    },
    command: "focusFileListPane",
    title: "Focus file list pane",
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
    command: "openFocusedItemInNoteList", // TODO rename
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
