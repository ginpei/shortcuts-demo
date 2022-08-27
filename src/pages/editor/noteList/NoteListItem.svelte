<script lang="ts">
  import Button from "../../../domains/buttons/Button.svelte";
  import Icon from "../../../domains/icons/Icon.svelte";
  import type { Note,NoteCallback } from "../../../domains/notes/Note";
  import { removeNoteFromState } from "../EditorPageState";
  import { editorPageStateStore } from "../editorPageStateStore";
  import NoteListItemMenuButton from "./NoteListItemMenuButton.svelte";

  export let note: Note;
  export let selected: boolean;
  export let onSelect: NoteCallback;
  export let focus: boolean = false;

  function onClick() {
    onSelect(note);
  }

  function onDeleteClick(event: Event) {
    event.stopPropagation();
    editorPageStateStore.update((state) =>
      removeNoteFromState(state, note.id)
    );
  }
</script>

<div
  class:focus={focus}
  class:selected={selected}
  class="NoteListItem"
  on:click={onClick}
>
  <div class="title" title={note.title}>{note.title}</div>
  <div class="controls">
    <Button on:click={onDeleteClick}>
      <Icon name="trash-can" />
    </Button>
    <NoteListItemMenuButton noteId={note.id} />
  </div>
</div>

<style lang="scss">
  .NoteListItem {
    align-items: center;
    border: 2px solid white;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
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

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .controls {
    display: flex;
    gap: 4px;
    visibility: hidden;

    .NoteListItem:hover &,
    .NoteListItem.focus &,
    .NoteListItem:focus-within & {
      visibility: visible;
    }
  }
</style>
