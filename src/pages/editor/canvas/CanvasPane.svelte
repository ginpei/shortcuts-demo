<script lang="ts">
  import type { Note } from "src/domains/notes/Note";
  import { editorPageStateStore, setNoteState } from "../editorPageStateStore";

  let note: Note | null = null;
  let text = "";

  editorPageStateStore.subscribe(({ notes, selectedNoteId }) => {
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
    if (!note) {
      throw new Error("Note gone");
    }

    setNoteState({
      ...note,
      body: text,
    });
  }
</script>

<div class="CanvasPane">
  <textarea
    bind:value={text}
    class="text"
    disabled={!Boolean(note)}
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

    &:disabled {
      background-color: #fcfcfc;
    }
  }
</style>
