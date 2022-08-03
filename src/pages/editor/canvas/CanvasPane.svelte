<script lang="ts">
  import type { NiceInputEvent } from "src/domains/events/NiceInputEvent";
  import type { Note } from "src/domains/notes/Note";
  import { execEditorPageCommand } from "../commands/editorPageCommands";
  import { editorPageStateStore,setNoteState } from "../editorPageStateStore";

  let note: Note | null = null;
  let title = "";
  let body = "";

  editorPageStateStore.subscribe(({ notes, selectedNoteId }) => {
    const newNote = notes.find((v) => v.id === selectedNoteId);
    if (!newNote) {
      note = null;
      title = "";
      body = "";
      return;
    }

    note = newNote;
    title = newNote.title;
    body = newNote.body;
  });

  // TODO remove focus when blur by keyboard shortcuts
  function onTitleFocus() {
    execEditorPageCommand('focusNoteTitle');
  }

  function onBodyFocus() {
    execEditorPageCommand('focusNoteBody');
  }

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
    class="title"
    disabled={!Boolean(note)}
    id="note-title"
    name="title"
    on:focus={onTitleFocus}
    on:input={onInput}
    type="text"
    value={title}
  />
  <textarea
    class="text"
    disabled={!Boolean(note)}
    id="note-body"
    name="body"
    on:focus={onBodyFocus}
    on:input={onInput}
    value={body}
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
