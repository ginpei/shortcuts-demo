<script lang="ts">
  import type { Note } from "src/domains/notes/Note";

  export let note: Note;
  export let selected: boolean;
</script>

<div
  class="FileItem"
  class:selected={selected}
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
