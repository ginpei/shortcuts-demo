import { createCommandDefinition } from "../../domains/commands/CommandDefinition";

export const editorPageCommands = [
  createCommandDefinition({
    action: () => {
      const el = document.querySelector("#note-body");
      if (el instanceof HTMLElement) {
        el.focus();
      }
    },
    command: "forucsNoteBody",
    title: "Focus note body",
  }),
  createCommandDefinition({
    action: () => {
      const el = document.querySelector("#note-title");
      if (el instanceof HTMLElement) {
        el.focus();
      }
    },
    command: "forucsNoteTitle",
    title: "Focus note title",
  }),
  createCommandDefinition({
    action: () => console.log(`# OK`),
    command: "forucsFileListPane",
    title: "Focus file list pane",
  }),
] as const;
