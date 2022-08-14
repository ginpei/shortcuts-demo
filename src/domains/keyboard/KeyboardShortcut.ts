export interface KeyboardShortcut<Command extends string> {
  command: Command;
  key: string;
  repeat?: boolean;
  when?: string;
}
