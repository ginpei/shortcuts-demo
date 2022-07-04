import type { KeyboardShortcut } from "src/domains/keyboard/KeyboardShortcut";

export const editorPageShortcuts = toShortcutDefinitions([
  {
    command: "forucsFileListPane",
    key: ["Ctrl+Shift+E"],
    when: "",
  },
  {
    command: "forucsNoteBody",
    key: ["Ctrl+1"],
    when: "",
  },
  {
    command: "forucsNoteTitle",
    key: ["Ctrl+0"],
    when: "",
  },
]);

function toShortcutDefinitions<T extends string>(
  shortcuts: KeyboardShortcut<T>[],
): readonly KeyboardShortcut<T>[] {
  return shortcuts;
}
