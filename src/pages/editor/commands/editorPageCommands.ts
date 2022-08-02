import { toCommandDefinitions } from "../../../domains/commands/CommandDefinition";
import { editorPageStateStore } from "../editorPageStateStore";
import { noteListCommands } from "../noteList/noteListCommands";

export type EditorPageCommandType = typeof editorPageCommands[number]['command'];

const editorPageTopCommands = toCommandDefinitions([
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
]);

export const editorPageCommands = [
  ...editorPageTopCommands,
  ...noteListCommands,
];
