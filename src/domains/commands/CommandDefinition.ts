export interface CommandDefinition<T extends string> {
  action: () => void;
  command: T;
}
