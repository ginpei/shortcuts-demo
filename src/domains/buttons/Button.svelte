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
    min-height: 32px;
    min-width: 32px;

    &:active {
      box-shadow: 0 0 0.2em currentColor inset;
    }
  }
</style>
