<script lang="ts">
	import type { CommandDefinition } from "src/domains/commands/CommandDefinition";
	import type { KeyboardShortcut } from "src/domains/keyboard/KeyboardShortcut";
	import { editorPageCommands, execEditorPageCommand } from "../commands/editorPageCommands";
	import { editorPageShortcuts } from "../commands/editorPageShortcuts";

  export let open: boolean;

  let el: HTMLDialogElement | undefined;
  let opened = false;
  let shortcutCommandPairs: [KeyboardShortcut<string>, CommandDefinition<string> | null][] = [];

  $: {
    shortcutCommandPairs = editorPageShortcuts.map((shortcut) => {
      const { command } = shortcut;
      const commandDef = editorPageCommands.find((v) => v.command === command);
      if (!commandDef) {
        return [shortcut, null];
      }

      return [shortcut, commandDef];
    });
  }

  $: {
    _toggleModal(open);
  }

  function onClose() {
    execEditorPageCommand("closeKeyboardShortcutList");
    opened = false;
  }

  function onCloseClick() {
    el?.close();
  }

  function _toggleModal(open: boolean) {
    if (!el) {
      return;
    }

    if (open && !opened) {
      el.showModal();
      opened = true;
    } else if (!open && opened) {
      el.close();
    }
  }
</script>

<dialog
  bind:this={el}
  class="KeyboardShortcutDialog"
  open={opened}
  on:close={onClose}
>
  <h1>Keyboard shortcuts</h1>
  <table class="shortcutTable">
    <thead>
      <tr>
        <th>Key</th>
        <th>Command</th>
        <th>When</th>
      </tr>
    </thead>
    <tbody>
      {#each shortcutCommandPairs as [shortcut, command]}
        <tr>
          <td class="shortutTable-keyCell">
            <code>{shortcut.key}</code>
          </td>
          <td class="shortutTable-commandCell">
            {command?.title ?? shortcut.command}
          </td>
          <td class="shortutTable-whenCell">
            {shortcut.when ?? ""}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <p>
    <button on:click={onCloseClick}>Close</button>
  </p>
</dialog>

<style lang="scss">
  .KeyboardShortcutDialog {
    border: thin solid lightgray;
  }

  dialog::backdrop {
    background-color: #0001;
  }
</style>
