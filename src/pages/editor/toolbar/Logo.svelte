<script lang="ts">
  import IconPng from "./icon-512.png";
</script>

<img src={IconPng} alt="App" class="Logo" width="32" height="32" />

<style lang="scss">
  .Logo {
    height: 100%;
    object-fit: contain;

    &:hover {
      background-color: var(--toolbar--background-color--hover);
    }
  }
</style>
