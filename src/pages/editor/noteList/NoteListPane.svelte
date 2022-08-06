<script lang="ts">
  import { scrollIntoView } from "../../../domains/positioning/scrollHandlers";
  import type { Note } from "src/domains/notes/Note";
  import { execEditorPageCommand } from "../commands/editorPageCommands";
  import { editorPageStateStore } from "../editorPageStateStore";
  import NoteListHeader from "./NoteListHeader.svelte";
  import FileListItem from "./NoteListItem.svelte";

  let items: Record<string, HTMLElement> = {};

  $: {
    const el = items[$editorPageStateStore.focusedNoteId];
    if (el) {
      scrollIntoView(el);
    }
  }

  function onPointerDown() {
    execEditorPageCommand('focusFileList');
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

<section class="FileListPane" on:pointerdown={onPointerDown}>
  <NoteListHeader />
  <div class="list" id="noteList-list" on:focus={onListFocus} tabindex="0">
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
</section>

<style lang="scss">
  .FileListPane {
    display: grid;
    grid-template-rows: calc(32px + 2 * 8px) auto;
    overflow: hidden;
  }

  .list {
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
