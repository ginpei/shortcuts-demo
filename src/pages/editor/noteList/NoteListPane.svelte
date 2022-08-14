<script lang="ts">
  import { scrollIntoView } from "../../../domains/positioning/scrollHandlers";
  import { execEditorPageCommand } from "../commands/editorPageCommands";
  import { editorPageStateStore } from "../editorPageStateStore";
  import NoteList from "./NoteList.svelte";
  import NoteListHeader from "./NoteListHeader.svelte";

  let items: Record<string, HTMLElement> = {};

  $: {
    const el = items[$editorPageStateStore.focusedNoteId];
    if (el) {
      scrollIntoView(el);
    }
  }

  function onPointerDown() {
    execEditorPageCommand('focusFileList');
  }
</script>

<section class="FileListPane" on:pointerdown={onPointerDown}>
  <NoteListHeader />
  <NoteList />
</section>

<style lang="scss">
  .FileListPane {
    display: grid;
    grid-template-rows: calc(32px + 2 * 8px) auto;
    overflow: hidden;
  }
</style>
