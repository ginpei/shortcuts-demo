<script lang="ts">
  import Dropdown from "../../../domains/dropdown/Dropdown.svelte";
  import DropdownMenuItem from "../../../domains/dropdown/DropdownMenuItem.svelte";
  import Icon from "../../../domains/icons/Icon.svelte";
  import { removeNoteFromState } from "../EditorPageState";
  import { editorPageStateStore } from "../editorPageStateStore";

  export let noteId: string;

  function onItemClick() {
    console.log(`# click`);
  }

  function onDeleteClick() {
      editorPageStateStore.update((state) =>
        removeNoteFromState(state, noteId)
      );
  }
</script>

<Dropdown label="…">
  <DropdownMenuItem on:click={onItemClick}>
    Copy
  </DropdownMenuItem>
  <DropdownMenuItem href="/" target="_blank">
    Open in view mode
  </DropdownMenuItem>
  <DropdownMenuItem on:click={onDeleteClick}>
    <Icon name="trash-can" />
    Delete
  </DropdownMenuItem>
</Dropdown>

<style lang="scss">
</style>
