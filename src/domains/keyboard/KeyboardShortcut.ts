export interface KeyboardShortcut<Command extends string> {
  command: Command;
  key: string[];
  when: string;
}
