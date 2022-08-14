<script lang="ts">
  import type { Note } from "src/domains/notes/Note";
  import { scrollIntoView } from "../../../domains/positioning/scrollHandlers";
  import { execEditorPageCommand } from "../commands/editorPageCommands";
  import { editorPageStateStore } from "../editorPageStateStore";
  import FileListItem from "./NoteListItem.svelte";

  let items: Record<string, HTMLElement> = {};

  $: {
    const el = items[$editorPageStateStore.focusedNoteId];
    if (el) {
      scrollIntoView(el);
    }
  }

  function onListFocus() {
    editorPageStateStore.update((values) => ({
      ...values,
      focus: 'noteList',
    }));
  }

  function onNoteSelect(note: Note) {
    editorPageStateStore.update((values) => {
      if (values.selectedNoteId === note.id) {
        return {
          ...values,
          focus: 'noteList',
        };
      }

      return {
        ...values,
        focusedNoteId: note.id,
      };
    });

    execEditorPageCommand('openItemInFocusedNoteList');
  }
</script>

<div class="NoteList" id="noteList-list" on:focus={onListFocus} tabindex="0">
  {#each $editorPageStateStore.notes as note}
    <div bind:this={items[note.id]} class="item">
      <FileListItem
        focus={note.id === $editorPageStateStore.focusedNoteId}
        note={note}
        onSelect={onNoteSelect}
        selected={note.id === $editorPageStateStore.selectedNoteId}
      />
    </div>
  {/each}
</div>

<style lang="scss">
  .NoteList {
    --note-list-pane--list-item--background-color--focus: #999;
    --note-list-pane--list-item--color--focus: #fff;
    border-radius: 4px;
    overflow: auto;
    padding-bottom: calc(8px * 10);
    outline-offset: -2px;

    &:focus-visible {
      --note-list-pane--list-item--background-color--focus: #036;
    }
  }

  .item {
    border-bottom: thin solid lightgray;
    
    &:first-child {
      border-top: thin solid lightgray;
    }
  }
</style>
