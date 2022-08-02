<script lang="ts">
  import type { Action } from "svelte/types/runtime/action";
  import { execCommand } from "../../domains/commands/commands";
  import { startAppFocusHandler } from "../../domains/focus/focusManager";
  import { startKeyboardShortcuts } from "../../domains/keyboard/keyboardShortcutHandlers";
  import CanvasPane from "./canvas/CanvasPane.svelte";
  import { focusMap } from "./commands/focuses";
  import "./EditorPage.scss";
  import { editorPageCommands } from "./commands/editorPageCommands";
  import { editorPageShortcuts } from "./commands/editorPageShortcuts";
  import { editorPageStateStore,getEditorPageState } from "./editorPageStateStore";
  import FileListPane from "./noteList/NoteListPane.svelte";
  import ToolbarPane from "./toolbar/ToolbarPane.svelte";

  const onUse: Action = () => {
    const offShortcuts = startKeyboardShortcuts(
      editorPageCommands,
      editorPageShortcuts,
      () => getEditorPageState().focus,
    );

    const offFocusManager = startAppFocusHandler(
      focusMap,
      editorPageStateStore,
    );

    return {
      destroy() {
        offShortcuts();
        offFocusManager();
      },
    };
  }

  function onCommand(event: CustomEvent) {
    if (event.type !== 'app-command') {
      throw new Error(`Expected event type 'command', got ${event.type}`);
    }

    execCommand(editorPageCommands, event.detail.command);
  }
</script>

<div class="EditorPage" use:onUse>
  <div class="pane" style="grid-area: toolbar"><ToolbarPane /></div>
  <div class="pane" style="grid-area: list">
    <FileListPane on:app-command={onCommand} />
  </div>
  <div class="pane" style="grid-area: canvas">
    <CanvasPane on:app-command={onCommand} />
  </div>
</div>

<style lang="scss">
  .EditorPage {
    display: grid;
    grid-template:
      "toolbar toolbar" 30px
      "list    canvas " auto
      / 20rem auto;
    height: 100vh;
    overflow: hidden;
    width: 100vw;
  }

  .pane {
    display: grid;
    overflow: hidden;
  }
</style>
