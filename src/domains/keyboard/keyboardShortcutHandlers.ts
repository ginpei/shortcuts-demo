import type { CommandDefinition } from "../commands/CommandDefinition";
import { toKeyCombination } from "./keyboardEventHandlers";
import type { KeyboardShortcut } from "./KeyboardShortcut";

export function startKeyboardShortcuts<
  Command extends string,
  AssignedCommand extends Command,
>(
  commands: readonly Readonly<CommandDefinition<Command>>[],
  keyAssignments: readonly Readonly<KeyboardShortcut<AssignedCommand>>[],
  getFocusId: () => string,
): () => void {
  const f = onKeyDown.bind(null, commands, keyAssignments, getFocusId);
  document.addEventListener("keydown", f);
  return () => document.removeEventListener("keydown", f);
}

function onKeyDown<Command extends string>(
  commands: readonly Readonly<CommandDefinition<Command>>[],
  keyAssignments: readonly Readonly<KeyboardShortcut<Command>>[],
  getFocusId: () => string,
  event: KeyboardEvent,
) {
  if (event.repeat) {
    return;
  }

  const keyCombination = toKeyCombination(event);
  // console.log("keyCombination", keyCombination);

  const focusId = getFocusId();
  const matchedCommands = findMatchedCommands(keyCombination, focusId, commands, keyAssignments)
  if (matchedCommands.length > 0) {
    event.preventDefault();
  }

  for (const command of matchedCommands) {
    command.action();
  }
}

function findMatchedCommands<Command extends string>(
  keyCombination: string,
  focusId: string,
  commands: readonly Readonly<CommandDefinition<Command>>[],
  keyAssignments: readonly Readonly<KeyboardShortcut<Command>>[],
): CommandDefinition<Command>[] {
  const matchedCommands: CommandDefinition<Command>[] = [];

  for (const keyAssignment of keyAssignments) {
    if (!keyAssignment.key.includes(keyCombination)) {
      continue;
    }

    if (keyAssignment.when?.startsWith('focus:')) {
      const targetFocus = keyAssignment.when.slice('focus:'.length);
      if (targetFocus !== focusId) {
        continue;
      }
    }

    const commandDef = commands.find((v) => v.command === keyAssignment.command);
    if (commandDef) {
      matchedCommands.push(commandDef);
    }
  }

  return matchedCommands;
}
