<script lang="ts">
  import type { Note } from "src/domains/notes/Note";
  import type { NiceInputEvent } from "src/misc/dom";
  import { editorPageStateStore,setNoteState } from "../editorPageStateStore";

  let note: Note | null = null;
  let title = "";
  let text = "";

  editorPageStateStore.subscribe(({ notes, selectedNoteId }) => {
    const newNote = notes.find((v) => v.id === selectedNoteId);
    if (!newNote) {
      note = null;
      text = "";
      return;
    }

    note = newNote;
    title = newNote.title;
    text = newNote.body;
  });

  function onInput(event: NiceInputEvent) {
    if (!note) {
      throw new Error("Note gone");
    }

    const { name, value } = event.currentTarget;

    if (name === "body") {
      setNoteState({
        ...note,
        body: value,
      });
    } else if (name === "title") {
      setNoteState({
        ...note,
        title: value,
      });
    } else {
      throw new Error(`Unknown input name: ${name}`);
    }
  }
</script>

<div class="CanvasPane">
  <input
    value={title}
    class="title"
    name="title"
    on:input={onInput}
    type="text"
  />
  <textarea
    value={text}
    class="text"
    disabled={!Boolean(note)}
    name="body"
    on:input={onInput}
  />
</div>

<style lang="scss">
  .CanvasPane {
    display: grid;
    grid-template-rows: 48px auto;
  }

  .title {
    font-size: 40px;
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
