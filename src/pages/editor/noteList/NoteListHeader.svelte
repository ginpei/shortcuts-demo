<script lang="ts">
  import { tick } from "svelte";
  import Button from "../../../domains/buttons/Button.svelte";
  import Icon from "../../../domains/icons/Icon.svelte";
  import { execEditorPageCommand } from "../commands/editorPageCommands";

  let mode: "" | "search" = "";
  let elSearchInput: HTMLElement | undefined;

  function onAddClick() {
    execEditorPageCommand('note:createAndOpen');
  }

  async function onSearchClick() {
    mode = "search";
    await tick();
    elSearchInput?.focus();
  }

  function onSearchDoneClick() {
    mode = "";
  }
</script>

<header class="NoteListHeader">
  {#if mode === "search"}
    <h1 class="heading">Search</h1>
    <div class="controls">
      <input bind:this={elSearchInput} type="search" />
      <Button on:click={onSearchDoneClick}>
        <Icon name="circle-xmark" />
      </Button>
    </div>
  {:else}
    <h1 class="heading">File list</h1>
    <div class="controls">
      <Button on:click={onAddClick}>
        <Icon name="plus" />
        Add
      </Button>
      <Button on:click={onSearchClick}>
        <Icon name="magnifying-glass" />
        Search
      </Button>
    </div>
  {/if}
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
    align-items: stretch;
    align-self: stretch;
    display: flex;
    gap: 2px;
  }
</style>
