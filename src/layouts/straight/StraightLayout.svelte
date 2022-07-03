<script lang="ts">
  export let name = "";
</script>

<div class="{name} StraightLayout">
  <div class="body">
    <slot />
  </div>
</div>

<style lang="scss">
  .body {
    box-sizing: border-box;
    margin-inline: auto;
    padding-inline: 1rem;
    width: min(60rem, 100%);
  }
</style>
