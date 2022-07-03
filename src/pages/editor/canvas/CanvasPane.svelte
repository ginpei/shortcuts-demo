<script lang="ts">
  import type { Note } from "src/domains/notes/Note";
  import { editorPageStateStore } from "../editorPageStateStore";

  let note: Note | null = null;
  let text = "";

  editorPageStateStore.subscribe(({ notes, selectedNoteId }) => {
    console.log('# selectedNoteId', selectedNoteId);
    const newNote = notes.find((v) => v.id === selectedNoteId);
    if (!newNote) {
      note = null;
      text = "";
      return;
    }

    note = newNote;
    text = newNote.body;
  });

  function onInput() {
    editorPageStateStore.update((values) => {
      if (!note) {
        throw new Error("Note gone");
      }

      const noteId = note.id;
      const index = values.notes.findIndex((v) => v.id === noteId);
      if (index < 0) {
        throw new Error("Note gone");
      }

      const newNote = {
        ...note,
        body: text,
      };
      values.notes[index] = newNote;

      return values;
    });
  }
</script>

<div class="CanvasPane">
  <textarea
    bind:value={text}
    class="text"
    on:input={onInput}
  />
</div>

<style lang="scss">
  .CanvasPane {
    display: grid;
  }

  .text {
    background-color: #fffffc;
    font-size: 18px;
    padding: 8px;
    resize: none;
  }
</style>
