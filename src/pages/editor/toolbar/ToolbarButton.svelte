<script lang="ts">
  export let onClick: (() => void) | undefined = undefined;
</script>

<button class="ToolbarButton" on:click={onClick}>
  <slot />
</button>

<style lang="scss">
  button {
    background-color: transparent;
    border-style: none;
    color: currentColor;
  }

  .ToolbarButton {
    display: grid;
    place-items: center;
    min-width: 32px;
    cursor: pointer;

    &:hover {
      background-color: var(--toolbar--background-color--hover);
    }
  }
</style>
