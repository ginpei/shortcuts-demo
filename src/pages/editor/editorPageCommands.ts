import { toCommandDefinitions } from "../../domains/commands/CommandDefinition";
import { editorPageStateStore } from "./editorPageStateStore";
import { noteListCommands } from "./noteList/noteListCommands";

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
      const el = document.querySelector("#note-body");
      if (el instanceof HTMLElement) {
        el.focus();
      }

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
      const el = document.querySelector("#note-title");
      if (el instanceof HTMLElement) {
        el.focus();
      }

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
