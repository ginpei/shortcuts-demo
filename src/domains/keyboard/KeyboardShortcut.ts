export interface KeyboardShortcut<Command extends string> {
  command: Command;
  key: string[];
  title: string;
  when: string;
}
