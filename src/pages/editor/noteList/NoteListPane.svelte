<script lang="ts">
  import { editorPageStateStore } from "../editorPageStateStore";
  import FileListItem from "./NoteListtem.svelte";
</script>

<section class="FileListPane">
  <h1 class="heading">File list</h1>
  <div class="list">
    {#each $editorPageStateStore.notes as note}
      <div class="item">
        <FileListItem
          note={note}
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
  }

  .list {
    overflow: auto;
    padding-bottom: calc(8px * 10);
  }

  .item {
    border-bottom: thin solid lightgray;
  }
</style>
