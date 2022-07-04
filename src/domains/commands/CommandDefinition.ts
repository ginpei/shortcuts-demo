import { noop } from "svelte/internal";

export interface CommandDefinition<T extends string> {
  action: () => void;
  command: T;
  title: string;
}

export function createCommandDefinition<T extends string>(
  init?: Partial<CommandDefinition<T>>
): CommandDefinition<T> {
  return {
    action: init?.action ?? noop,
    command: init?.command ?? ("" as T),
    title: init?.title ?? "",
  };
}

/**
 * To infer `T` because `key: CommandDefinition[]` nor
 * `[] as CommandDefinition[]` does not work.
 */
export function toCommandDefinitions<T extends string>(
  defs: CommandDefinition<T>[]
): CommandDefinition<T>[] {
  return defs;
}
