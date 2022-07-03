import type { CommandDefinition } from "./CommandDefinition";

export function execCommand<T extends string>(
  commands: CommandDefinition<T>[],
  command: T,
): void {
  const def = commands.find((v) => v.command === command);
  if (!def) {
    return;
  }

  def.action();
}
