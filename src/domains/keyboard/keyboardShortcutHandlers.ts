import type { CommandDefinition } from "../commands/CommandDefinition";
import { toKeyCombination } from "./keyboardEventHandlers";
import type { KeyboardShortcut } from "./KeyboardShortcut";

export function startKeyboardShortcuts<
  Command extends string,
  AssignedCommand extends Command,
  FocusType extends string
>(
  commands: readonly Readonly<CommandDefinition<Command>>[],
  keyAssignments: readonly Readonly<KeyboardShortcut<AssignedCommand>>[],
  getFocusType: () => FocusType,
): () => void {
  const f = onKeyDown.bind(null, commands, keyAssignments, getFocusType);
  document.addEventListener("keydown", f);
  return () => document.removeEventListener("keydown", f);
}

function onKeyDown<Command extends string, FocusType extends string>(
  commands: readonly Readonly<CommandDefinition<Command>>[],
  keyAssignments: readonly Readonly<KeyboardShortcut<Command>>[],
  getFocusType: () => FocusType,
  event: KeyboardEvent,
) {
  if (event.repeat) {
    return;
  }

  const keyCombination = toKeyCombination(event);
  const focusType = getFocusType();
  const matchedCommands = findMatchedCommands(keyCombination, focusType, commands, keyAssignments)
  if (matchedCommands.length > 0) {
    event.preventDefault();
  }

  for (const command of matchedCommands) {
    command.action();
  }
}

function findMatchedCommands<Command extends string, FocusType extends string>(
  keyCombination: string,
  focusType: FocusType,
  commands: readonly Readonly<CommandDefinition<Command>>[],
  keyAssignments: readonly Readonly<KeyboardShortcut<Command>>[],
): CommandDefinition<Command>[] {
  const matchedCommands: CommandDefinition<Command>[] = [];

  for (const keyAssignment of keyAssignments) {
    if (!keyAssignment.key.includes(keyCombination)) {
      continue;
    }

    if (keyAssignment.when.startsWith('focus:')) {
      const targetFocusType = keyAssignment.when.slice('focus:'.length);
      if (targetFocusType !== focusType) {
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
