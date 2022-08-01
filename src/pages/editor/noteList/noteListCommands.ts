import { toCommandDefinitions } from "../../../domains/commands/CommandDefinition";
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
      const curIndex = notes.findIndex((v) => v.id === focusedNoteId);
      const nextIndex = curIndex >= 0 ? curIndex - 1 : 0;
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
      const nextIndex = curIndex >= 0 ? curIndex + 1 : 0;
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
        focus: 'noteBody',
        selectedNoteId: focusedNoteId,
      }));
    },
    command: "openFocusedItemInNoteList",
    title: "Open focused item",
  },
]);
