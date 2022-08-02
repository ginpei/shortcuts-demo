<script lang="ts">
  import type { Note } from "src/domains/notes/Note";
  import { createEditorPageCommandEventDispatcher } from "../commands/editorPageCommandEvents";
  import { editorPageStateStore } from "../editorPageStateStore";
  import NoteListHeader from "./NoteListHeader.svelte";
  import FileListItem from "./NoteListItem.svelte";

  const dispatch = createEditorPageCommandEventDispatcher();
  let focused = false;

  editorPageStateStore.subscribe((state) => {
    focused = state.focus === 'noteListPane';
  });

  function onPointerDown() {
    dispatch('focusFileListPane');
  }

  function onNoteSelect(note: Note) {
    editorPageStateStore.update((values) => {
      return {
        ...values,
        focusedNoteId: note.id,
      };
    });

    dispatch('openFocusedItemInNoteList');
  }
</script>

<section class="FileListPane" on:pointerdown={onPointerDown}>
  <NoteListHeader {focused} />
  <div class="list" id="noteList-list">
    {#each $editorPageStateStore.notes as note}
      <div class="item">
        <FileListItem
          focus={note.id === $editorPageStateStore.focusedNoteId}
          note={note}
          onSelect={onNoteSelect}
          selected={note.id === $editorPageStateStore.selectedNoteId}
        />
      </div>
    {/each}
  </div>
</section>

<style lang="scss">
  .FileListPane {
    display: grid;
    grid-template-rows: calc(32px + 2 * 8px) auto;
    overflow: hidden;
  }

  .list {
    overflow: auto;
    padding-bottom: calc(8px * 10);
  }

  .item {
    border-bottom: thin solid lightgray;
    
    &:first-child {
      border-top: thin solid lightgray;
    }
  }
</style>
