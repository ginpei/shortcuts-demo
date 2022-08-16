import type { CommandDefinition } from "../commands/CommandDefinition";
import { toError } from "../errors/errorHandlers";
import { toKeyCombination } from "./keyboardEventHandlers";
import type { KeyboardShortcut } from "./KeyboardShortcut";

export function startKeyboardShortcuts<
  Command extends string,
  AssignedCommand extends Command,
>(
  commands: readonly Readonly<CommandDefinition<Command>>[],
  keyAssignments: readonly Readonly<KeyboardShortcut<AssignedCommand>>[],
  getFocusId: () => string,
  onError?: (error: Error) => void,
): () => void {
  const f = (event: KeyboardEvent) => {
    try {
      onKeyDown(commands, keyAssignments, getFocusId, event);
    } catch (error) {
      if (onError) {
        onError(toError(error));
      } else {
        throw error;
      }
    }
  };
  document.addEventListener("keydown", f);
  return () => document.removeEventListener("keydown", f);
}

function onKeyDown<Command extends string>(
  commands: readonly Readonly<CommandDefinition<Command>>[],
  keyAssignments: readonly Readonly<KeyboardShortcut<Command>>[],
  getFocusId: () => string,
  event: KeyboardEvent,
) {
  const keyCombination = toKeyCombination(event);
  // console.log("keyCombination", keyCombination);

  const focusId = getFocusId();
  const matchedCommands = findMatchedCommands(keyCombination, event.repeat, focusId, commands, keyAssignments)
  if (matchedCommands.length > 0) {
    event.preventDefault();
  }

  for (const command of matchedCommands) {
    command.action();
  }
}

function findMatchedCommands<Command extends string>(
  keyCombination: string,
  repeat: boolean,
  focusId: string,
  commands: readonly Readonly<CommandDefinition<Command>>[],
  keyAssignments: readonly Readonly<KeyboardShortcut<Command>>[],
): CommandDefinition<Command>[] {
  const matchedCommands: CommandDefinition<Command>[] = [];

  for (const keyAssignment of keyAssignments) {
    if (repeat === true && keyAssignment.repeat !== true) {
      continue;
    }

    if (keyAssignment.key !== keyCombination) {
      continue;
    }

    if (keyAssignment.when?.startsWith('focus:')) {
      const targetFocus = keyAssignment.when.slice('focus:'.length);
      if (targetFocus !== focusId) {
        continue;
      }
    }

    const commandDef = commands.find((v) => v.command === keyAssignment.command);
    if (!commandDef) {
      throw new Error(`Command not found: ${keyAssignment.command}`);
    }

    matchedCommands.push(commandDef);
  }

  return matchedCommands;
}
