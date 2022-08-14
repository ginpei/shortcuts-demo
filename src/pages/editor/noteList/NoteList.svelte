<script lang="ts">
  import { setFocus } from "../../../../src/domains/focus/focusManager";
  import type { Note } from "../../../../src/domains/notes/Note";
  import { scrollIntoView } from "../../../domains/positioning/scrollHandlers";
  import { execEditorPageCommand } from "../commands/editorPageCommands";
  import { editorPageStateStore } from "../editorPageStateStore";
  import FileListItem from "./NoteListItem.svelte";

  let items: Record<string, HTMLElement> = {};
  let lastFocusedNoteId = $editorPageStateStore.focusedNoteId;

  $: {
    const { focusedNoteId } = $editorPageStateStore;
    if (focusedNoteId !== lastFocusedNoteId) {
      lastFocusedNoteId = focusedNoteId;
      const el = items[focusedNoteId];
      if (el) {
        scrollIntoView(el);
      }
    }
  }

  function onNoteSelect(note: Note) {
    if ($editorPageStateStore.selectedNoteId === note.id) {
      setFocus('noteList-list');
      return;
    }

    editorPageStateStore.update((values) => ({
      ...values,
      focusedNoteId: note.id,
    }));

    execEditorPageCommand('openItemInFocusedNoteList');
  }
</script>

<div class="NoteList" id="noteList-list" tabindex="0">
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

    &:focus {
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
