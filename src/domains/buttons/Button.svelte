<script lang="ts">
</script>

<button class="Button" on:click>
  <slot />
</button>

<style lang="scss">
  .Button {
    background-color: #fff;
    border-radius: 2px;
    border: thin solid currentColor;
    color: #036;
    cursor: pointer;
    min-height: 32px;
    min-width: 32px;

    &:hover {
      box-shadow: 0 0 0.1em currentColor inset;
    }

    &:active {
      box-shadow: 0 0 0.2em currentColor inset;
    }
  }
</style>
