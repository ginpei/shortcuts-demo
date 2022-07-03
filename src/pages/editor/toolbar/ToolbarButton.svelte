<script lang="ts">
</script>

<span class="ToolbarButton">
  <slot />
</span>

<style lang="scss">
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
