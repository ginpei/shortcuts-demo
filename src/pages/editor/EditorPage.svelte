<script lang="ts">
  import { onDestroy,onMount } from "svelte";
  import { startKeyboardShortcuts } from "../../domains/keyboard/keyboardShortcuts";
  import CanvasPane from "./canvas/CanvasPane.svelte";
  import "./EditorPage.scss";
  import { editorPageCommands } from "./editorPageCommands";
  import FileListPane from "./noteList/NoteListPane.svelte";
  import ToolbarPane from "./toolbar/ToolbarPane.svelte";

  let offShortcuts: (() => void) | null = null;

  onMount(() => {
    offShortcuts = startKeyboardShortcuts(
      editorPageCommands,
      [
        {
          command: "forucsFileListPane",
          key: ["Ctrl+Shift+E"],
          title: "Focus file list pane",
          when: "",
        },
        {
          command: "forucsNoteBody",
          key: ["Ctrl+1"],
          title: "Focus note body",
          when: "",
        },
        {
          command: "forucsNoteTitle",
          key: ["Ctrl+0"],
          title: "Focus note title",
          when: "",
        },
      ]
    );
  });

  onDestroy(() => offShortcuts?.());
</script>

<div class="EditorPage">
  <div class="pane" style="grid-area: toolbar"><ToolbarPane /></div>
  <div class="pane" style="grid-area: list"><FileListPane /></div>
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
