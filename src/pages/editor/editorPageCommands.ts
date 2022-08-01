import { toCommandDefinitions } from "../../domains/commands/CommandDefinition";
import { noteListCommands } from "./noteList/noteListCommands";

const editorPageTopCommands = toCommandDefinitions([
  {
    action: () => {
      const el = document.querySelector("#note-body");
      if (el instanceof HTMLElement) {
        el.focus();
      }
    },
    command: "focusNoteBody",
    title: "Focus note body",
  },
  {
    action: () => {
      const el = document.querySelector("#note-title");
      if (el instanceof HTMLElement) {
        el.focus();
      }
    },
    command: "focusNoteTitle",
    title: "Focus note title",
  },
]);

export const editorPageCommands = [
  ...editorPageTopCommands,
  ...noteListCommands,
];
