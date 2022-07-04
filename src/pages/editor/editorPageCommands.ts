import { toCommandDefinitions } from "../../domains/commands/CommandDefinition";

export const editorPageCommands = toCommandDefinitions([
  {
    action: () => {
      const el = document.querySelector("#note-body");
      if (el instanceof HTMLElement) {
        el.focus();
      }
    },
    command: "forucsNoteBody",
    title: "Focus note body",
  },
  {
    action: () => {
      const el = document.querySelector("#note-title");
      if (el instanceof HTMLElement) {
        el.focus();
      }
    },
    command: "forucsNoteTitle",
    title: "Focus note title",
  },
  {
    action: () => console.log(`# OK`),
    command: "forucsFileListPane",
    title: "Focus file list pane",
  },
]);
