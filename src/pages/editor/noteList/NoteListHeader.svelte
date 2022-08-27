<script lang="ts">
  import Button from "../../../domains/buttons/Button.svelte";
  import Icon from "../../../domains/icons/Icon.svelte";
  import { execEditorPageCommand } from "../commands/editorPageCommands";

  function onAddClick() {
    execEditorPageCommand('note:newAndOpen');
  }
</script>

<header class="NoteListHeader">
  <h1 class="heading">File list</h1>
  <div class="controls">
    <Button on:click={onAddClick}>
      <Icon name="plus" />
      Add
    </Button>
    <Button>
      <Icon name="magnifying-glass" />
      Search
    </Button>
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
  }

  .controls {
    display: flex;
    gap: 2px;
  }
</style>
