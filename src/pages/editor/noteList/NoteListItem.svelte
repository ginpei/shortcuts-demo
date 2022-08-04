<script lang="ts">
  import type { Note, NoteCallback } from "src/domains/notes/Note";

  export let note: Note;
  export let selected: boolean;
  export let onSelect: NoteCallback;
  export let focus: boolean = false;

  function onClick() {
    onSelect(note);
  }
</script>

<div
  class:focus={focus}
  class:selected={selected}
  class="FileItem"
  on:click={onClick}
>
  <div class="title">
    <span>{note.title}</span>
  </div>
</div>

<style lang="scss">
  .FileItem {
    border: 2px solid white;
    box-sizing: border-box;
    line-height: 1;
    padding: 8px;

    &:focus,
    &.focus {
      outline-offset: -1px;
      outline: thin solid blue;
    }

    &.selected {
      background-color: var(--note-list-pane--list-item--background-color--focus);
      color: var(--note-list-pane--list-item--color--focus);
    }
  }
</style>
