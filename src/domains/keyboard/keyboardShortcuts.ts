import type { CommandDefinition } from "../commands/CommandDefinition";
import type { KeyboardShortcut } from "./KeyboardShortcut";

export function startKeyboardShortcuts<Command extends string>(
  commands: readonly CommandDefinition<Command>[],
  keyAssignments: readonly KeyboardShortcut<Command>[],
): () => void {
  const f = onKeyDown.bind(null, commands, keyAssignments);
  document.addEventListener("keydown", f);
  return () => document.removeEventListener("keydown", f);
}

function onKeyDown<Command extends string>(
  commands: readonly CommandDefinition<Command>[],
  keyAssignments: readonly KeyboardShortcut<Command>[],
  event: KeyboardEvent,
) {
  if (event.repeat) {
    return;
  }

  const keyCombination = toKeyCombination(event);
  const candidates = keyAssignments.filter((v) => v.key.includes(keyCombination));

  for (const def of candidates) {
    const commandDef = commands.find((v) => v.command === def.command);
    if (commandDef) {
      commandDef.action();
      return;
    }
  }
}

function toKeyCombination(event: KeyboardEvent): string {
  const {
    altKey,
    ctrlKey,
    metaKey,
    shiftKey,
    key,
  } = event;

  const keyCombination = [
    ctrlKey || metaKey ? "Ctrl+" : "",
    altKey ? "Alt+" : "",
    shiftKey ? "Shift+" : "",
    key,
  ]
    .filter((v) => Boolean(v))
    .join("");

  return keyCombination;
}
