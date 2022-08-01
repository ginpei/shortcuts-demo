<script lang="ts">
  import { onDestroy,onMount } from "svelte";
  import { startKeyboardShortcuts } from "../../domains/keyboard/keyboardShortcutHandlers";
  import CanvasPane from "./canvas/CanvasPane.svelte";
  import "./EditorPage.scss";
  import { editorPageCommands } from "./editorPageCommands";
  import { editorPageShortcuts } from "./editorPageShortcuts";
  import FileListPane from "./noteList/NoteListPane.svelte";
  import ToolbarPane from "./toolbar/ToolbarPane.svelte";

  let offShortcuts: (() => void) | null = null;

  onMount(() => {
    offShortcuts = startKeyboardShortcuts(
      editorPageCommands,
      editorPageShortcuts
    );
  });

  onDestroy(() => offShortcuts?.());

  function onCommand(event: CustomEvent) {
    if (event.type !== 'command') {
      throw new Error(`Expected event type 'command', got ${event.type}`);
    }

    const { command } = event.detail;
    const def = editorPageCommands.find((v) => v.command === command);
    if (!def) {
      throw new Error(`Unknown command ${command}`);
    }
    def.action();
  }
</script>

<div class="EditorPage">
  <div class="pane" style="grid-area: toolbar"><ToolbarPane /></div>
  <div class="pane" style="grid-area: list">
    <FileListPane on:command={onCommand} />
  </div>
  <div class="pane" style="grid-area: canvas"><CanvasPane /></div>
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
