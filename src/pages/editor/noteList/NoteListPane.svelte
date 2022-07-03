<script lang="ts">
  import type { Note } from "src/domains/notes/Note";
  import FileListItem from "./NoteListtem.svelte";

  export let notes: Note[];

  let selectedFileItemId = notes[0]?.id ?? "";
</script>

<section class="FileListPane">
  <h1 class="heading">File list</h1>
  <div class="list">
    {#each notes as note}
      <div class="item">
        <FileListItem
          note={note}
          selected={note.id === selectedFileItemId}
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
