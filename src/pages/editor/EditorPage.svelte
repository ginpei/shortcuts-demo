<script lang="ts">
  import type { Action } from "svelte/types/runtime/action";
  import { showError } from "../../domains/errors/errorUiHandlers";
  import { bindFocusToStore } from "../../domains/focus/focusManager";
  import { startKeyboardShortcuts } from "../../domains/keyboard/keyboardShortcutHandlers";
  import CanvasPane from "./canvas/CanvasPane.svelte";
  import { editorPageCommands } from "./commands/editorPageCommands";
  import { editorPageShortcuts } from "./commands/editorPageShortcuts";
  import "./EditorPage.scss";
  import { editorPageStateStore,getEditorPageState } from "./editorPageStateStore";
  import FileListPane from "./noteList/NoteListPane.svelte";
  import ToolbarPane from "./toolbar/ToolbarPane.svelte";
  import "../../domains/design/values.scss";
	import KeyboardShortcutDialog from "./misc/KeyboardShortcutDialog.svelte";

  const onUse: Action = () => {
    const offShortcuts = startKeyboardShortcuts(
      editorPageCommands,
      editorPageShortcuts,
      () => getEditorPageState().focus,
      (error) => showError(error),
    );

    const offFocusManager = bindFocusToStore(editorPageStateStore);

    return {
      destroy() {
        offShortcuts();
        offFocusManager();
      },
    };
  }
</script>

<div class="EditorPage" use:onUse>
  <div class="pane" style="grid-area: toolbar"><ToolbarPane /></div>
  <div class="pane" style="grid-area: list">
    <FileListPane />
  </div>
  <div class="pane" style="grid-area: canvas">
    <CanvasPane />
  </div>
  <KeyboardShortcutDialog
    open={$editorPageStateStore.showKeyboardShortcutList}
  />
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
