import type { CommandDefinition } from "../commands/CommandDefinition";
import { toKeyCombination } from "./keyboardEventHandlers";
import type { KeyboardShortcut } from "./KeyboardShortcut";

export function startKeyboardShortcuts<
  Command extends string,
  AssignedCommand extends Command
>(
  commands: readonly Readonly<CommandDefinition<Command>>[],
  keyAssignments: readonly Readonly<KeyboardShortcut<AssignedCommand>>[],
): () => void {
  const f = onKeyDown.bind(null, commands, keyAssignments);
  document.addEventListener("keydown", f);
  return () => document.removeEventListener("keydown", f);
}

function onKeyDown<Command extends string>(
  commands: readonly Readonly<CommandDefinition<Command>>[],
  keyAssignments: readonly Readonly<KeyboardShortcut<Command>>[],
  event: KeyboardEvent,
) {
  if (event.repeat) {
    return;
  }

  const keyCombination = toKeyCombination(event);
  const matchedCommands = findMatchedCommands(keyCombination, commands, keyAssignments)
  for (const command of matchedCommands) {
    command.action();
  }
}

function findMatchedCommands<Command extends string>(
  keyCombination: string,
  commands: readonly Readonly<CommandDefinition<Command>>[],
  keyAssignments: readonly Readonly<KeyboardShortcut<Command>>[],
): CommandDefinition<Command>[] {
  const matchedCommands: CommandDefinition<Command>[] = [];

  for (const keyAssignment of keyAssignments) {
    if (!keyAssignment.key.includes(keyCombination)) {
      continue;
    }

    const commandDef = commands.find((v) => v.command === keyAssignment.command);
    if (commandDef) {
      matchedCommands.push(commandDef);
    }
  }

  return matchedCommands;
}
