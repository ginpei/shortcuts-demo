import { toCommandDefinitions } from "../../../domains/commands/CommandDefinition";
import { editorPageStateStore, getEditorPageState } from "../editorPageStateStore";

export const noteListCommands = toCommandDefinitions([
  {
    action() {
      const el = document.querySelector("#noteList-list [tabindex]");
      if (el instanceof HTMLElement) {
        el.focus();
      }
    },
    command: "focusFileListPane",
    title: "Focus file list pane",
  },
  {
    action() {
      const { focusedNoteId, notes } = getEditorPageState();
      const curIndex = notes.findIndex((v) => v.id === focusedNoteId);
      if (curIndex < 0) {
        return;
      }
      const nextIndex = curIndex - 1;
      const nextNote = notes[nextIndex];
      if (!nextNote) {
        return;
      }

      editorPageStateStore.update((v) => ({
        ...v,
        focusedNoteId: nextNote.id,
      }));
    },
    command: "moveToPrevNote",
    title: "Move to prev note",
  },
  {
    action() {
      const { focusedNoteId, notes } = getEditorPageState();
      const curIndex = notes.findIndex((v) => v.id === focusedNoteId);
      if (curIndex < 0) {
        return;
      }
      const nextIndex = curIndex + 1;
      const nextNote = notes[nextIndex];
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
        selectedNoteId: focusedNoteId,
      }));
    },
    command: "openFocusedItemInNoteList",
    title: "Open focused item",
  },
]);
