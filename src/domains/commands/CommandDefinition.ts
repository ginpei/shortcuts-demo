import { noop } from "svelte/internal";

export interface CommandDefinition<T extends string> {
  action: () => void;
  command: T;
}

export function createCommandDefinition<T extends string>(
  init?: Partial<CommandDefinition<T>>
): CommandDefinition<T> {
  return {
    action: init?.action ?? noop,
    command: init?.command ?? ("" as T),
  };
}
