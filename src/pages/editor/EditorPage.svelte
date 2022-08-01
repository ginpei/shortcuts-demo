<script lang="ts">
  import { execCommand } from "../../domains/commands/commands";
  import { onDestroy,onMount } from "svelte";
  import { startKeyboardShortcuts } from "../../domains/keyboard/keyboardShortcutHandlers";
  import CanvasPane from "./canvas/CanvasPane.svelte";
  import "./EditorPage.scss";
  import { editorPageCommands } from "./editorPageCommands";
  import { editorPageShortcuts } from "./editorPageShortcuts";
  import { getEditorPageState } from "./editorPageStateStore";
  import FileListPane from "./noteList/NoteListPane.svelte";
  import ToolbarPane from "./toolbar/ToolbarPane.svelte";

  let offShortcuts: (() => void) | null = null;

  onMount(() => {
    offShortcuts = startKeyboardShortcuts(
      editorPageCommands,
      editorPageShortcuts,
      () => getEditorPageState().focus,
    );
  });

  onDestroy(() => offShortcuts?.());

  function onCommand(event: CustomEvent) {
    if (event.type !== 'app-command') {
      throw new Error(`Expected event type 'command', got ${event.type}`);
    }

    execCommand(editorPageCommands, event.detail.command);
  }
</script>

<div class="EditorPage">
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
