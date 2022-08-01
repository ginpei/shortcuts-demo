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
  // TODO run only if panel is focused
  {
    command: "moveToPrevNote",
    key: ["ArrowUp"],
    when: "",
  },
  {
    command: "moveToNextNote",
    key: ["ArrowDown"],
    when: "",
  },
  {
    command: "openFocusedItemInNoteList",
    key: ["Enter"],
    when: "",
  },
]);

function toShortcutDefinitions<T extends string>(
  shortcuts: KeyboardShortcut<T>[],
): readonly KeyboardShortcut<T>[] {
  return shortcuts;
}
