import type { KeyboardShortcut } from "src/domains/keyboard/KeyboardShortcut";

export const editorPageShortcuts = toShortcutDefinitions([
  {
    command: "focusFileList",
    key: "Ctrl+Shift+E",
  },
  {
    command: "focusNoteBody",
    key: "Ctrl+1",
  },
  {
    command: "focusNoteTitle",
    key: "Ctrl+0",
  },
  {
    command: "moveToPrevNote",
    key: "ArrowUp",
    when: "focus:noteList-list",
  },
  {
    command: "moveToNextNote",
    key: "ArrowDown",
    when: "focus:noteList-list",
  },
  {
    command: "openItemInFocusedNoteList",
    key: "Enter",
    when: "focus:noteList-list",
  },
  {
    command: "openItemInFocusedNoteList",
    key: "Space",
    when: "focus:noteList-list",
  },
  {
    command: "deleteNoteFocusedInList",
    key: "Backspace",
    when: "focus:noteList-list",
  },
  {
    command: "deleteNoteFocusedInList",
    key: "Delete",
    when: "focus:noteList-list",
  },
  {
    command: "note:new",
    key: "Alt+N",
  },
]);

function toShortcutDefinitions<T extends string>(
  shortcuts: KeyboardShortcut<T>[],
): readonly KeyboardShortcut<T>[] {
  return shortcuts;
}
