import type { KeyboardShortcut } from "src/domains/keyboard/KeyboardShortcut";

export const editorPageShortcuts = toShortcutDefinitions([
  {
    command: "focusFileListPane",
    key: ["Ctrl+Shift+E"],
    when: "",
  },
  {
    command: "focusNoteBody",
    key: ["Ctrl+1"],
    when: "",
  },
  {
    command: "focusNoteTitle",
    key: ["Ctrl+0"],
    when: "",
  },
  {
    command: "moveToPrevNote",
    key: ["ArrowUp"],
    when: "focus:noteListPane",
  },
  {
    command: "moveToNextNote",
    key: ["ArrowDown"],
    when: "focus:noteListPane",
  },
  {
    command: "openFocusedItemInNoteList",
    key: ["Enter"],
    when: "focus:noteListPane",
  },
  {
    command: "openFocusedItemInNoteList",
    key: ["Space"],
    when: "focus:noteListPane",
  },
  {
    command: "deleteNoteFocusedInList",
    key: ["Backspace"],
    when: "focus:noteListPane",
  },
  {
    command: "deleteNoteFocusedInList",
    key: ["Delete"],
    when: "focus:noteListPane",
  },
]);

function toShortcutDefinitions<T extends string>(
  shortcuts: KeyboardShortcut<T>[],
): readonly KeyboardShortcut<T>[] {
  return shortcuts;
}
