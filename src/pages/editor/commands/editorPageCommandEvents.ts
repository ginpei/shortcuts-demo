import { createEventDispatcher } from "svelte";
import type { EditorPageCommandType } from "./editorPageCommands";

export function createEditorPageCommandEventDispatcher(): (
  command: EditorPageCommandType
) => void {
  const dispatch = createEventDispatcher();
  const f = (command: string) => dispatch('app-command', { command });
  return f;
}
