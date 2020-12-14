import { useEffect } from "react";

export interface KeyboardShortcut {
  command: string;
  keyBind: KeyboardCombination[];
  when: string[];
}

export interface KeyboardCombination {
  altKey?: boolean;
  ctrlKey?: boolean;
  key: string;
  shiftKey?: boolean;
}

export function useKeyboardShortcuts(
  shortcuts: readonly KeyboardShortcut[],
  focusName: string,
  targetWindow = window
): void {
  shortcuts.forEach((v) => assertKeyboardShortcut(v));

  useEffect(() => {
    targetWindow.addEventListener("keydown", onKeyPress);
    return () => targetWindow.removeEventListener("keydown", onKeyPress);

    function onKeyPress(event: KeyboardEvent) {
      const matched = findMatchedShortcut(shortcuts, focusName, event);
      if (!matched) {
        return;
      }

      event.preventDefault();
      console.log("# matched.command", matched.command);
    }
  }, [shortcuts, focusName, targetWindow]);
}

function assertKeyboardShortcut(shortcut: KeyboardShortcut) {
  // TODO
  if (shortcut.keyBind.length !== 1 || shortcut.when.length !== 1) {
    throw new Error("Not yet");
  }

  const { key } = shortcut.keyBind[0];
  if (!/^[A-Z]$/.test(key)) {
    throw new Error("Key must be A-Z");
  }
}

function findMatchedShortcut(
  shortcuts: readonly KeyboardShortcut[],
  focusName: string,
  event: KeyboardEvent
): KeyboardShortcut | undefined {
  const matched = shortcuts.find((shortcut) => {
    const inContext = shortcut.when[0] === focusName;
    if (!inContext) {
      return false;
    }

    const { keyBind } = shortcut;
    const eventKey = event.key.toUpperCase();
    const keyPressed = keyBind[0].key === eventKey;
    if (!keyPressed) {
      return false;
    }

    const matchModifiers =
      event.altKey === !!keyBind[0].altKey &&
      event.ctrlKey === !!keyBind[0].ctrlKey &&
      event.shiftKey === !!keyBind[0].shiftKey;
    if (!matchModifiers) {
      return false;
    }

    return true;
  });
  return matched;
}
