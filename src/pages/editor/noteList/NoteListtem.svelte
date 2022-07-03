<script lang="ts">
  import type { Note, NoteCallback } from "src/domains/notes/Note";

  export let note: Note;
  export let selected: boolean;
  export let onSelect: NoteCallback;

  function onClick() {
    onSelect(note);
  }
</script>

<div
  class="FileItem"
  class:selected={selected}
  on:click={onClick}
>
  <div class="title">
    <span>{note.title}</span>
  </div>
</div>

<style lang="scss">
  .FileItem {
    padding: 8px;

    &.selected {
      color: tomato;
    }
  }
</style>
