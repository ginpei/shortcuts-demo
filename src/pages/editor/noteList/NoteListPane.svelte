<script lang="ts">
  import type { Note } from "src/domains/notes/Note";
  import { createEventDispatcher } from "svelte";
  import { editorPageStateStore } from "../editorPageStateStore";
  import FileListItem from "./NoteListtem.svelte";

  const dispatch = createEventDispatcher();

  function onPointerDown() {
    dispatch('command', { command: 'focusFileListPane' });
  }

  function onNoteSelect(note: Note) {
    editorPageStateStore.update((values) => {
      return {
        ...values,
        focusedNoteId: note.id,
        selectedNoteId: note.id,
      };
    });
  }
</script>

<section class="FileListPane" on:pointerdown={onPointerDown}>
  <h1 class="heading">File list</h1>
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
    grid-template-rows: 2rem auto;
    overflow: hidden;
  }

  .heading {
    font-size: 1rem;
    margin: 0;
    padding: 8px;
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
