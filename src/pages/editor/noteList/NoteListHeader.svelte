<script lang="ts">
  import { execEditorPageCommand } from "../commands/editorPageCommands";

  export let focused: boolean;

  function onAddClick() {
    execEditorPageCommand('note:new');
  }
</script>

<header class="NoteListHeader">
  <h1 class="heading" class:focused>File list</h1>
  <div class="controls">
    <button class="button" on:click={onAddClick}>
      +
    </button>
    <button class="button">
      🔍
    </button>
  </div>
</header>

<style lang="scss">
  .NoteListHeader {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 8px;
  }

  .heading {
    font-size: 1rem;
    margin: 0;

    &.focused {
      text-decoration: underline;
    }
  }

  .controls {
    display: flex;
    gap: 2px;
  }

  .button {
    padding: 0;
    height: 32px;
    width: 32px;
  }
</style>
