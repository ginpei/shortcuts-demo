import { createCommandDefinition } from "src/domains/commands/CommandDefinition";

export const editorPageCommands = [
  createCommandDefinition({
    action: () => {
      const el = document.querySelector("#note-body");
      if (el instanceof HTMLElement) {
        el.focus();
      }
    },
    command: "forucsNoteBody",
  }),
  createCommandDefinition({
    action: () => {
      const el = document.querySelector("#note-title");
      if (el instanceof HTMLElement) {
        el.focus();
      }
    },
    command: "forucsNoteTitle",
  }),
  createCommandDefinition({
    action: () => console.log(`# OK`),
    command: "forucsFileListPane",
  }),
] as const;
