<script lang="ts">
  import type { FileItem } from "src/domains/fileItems/FileItem";

  export let fileItem: FileItem;
  export let selected: boolean;
</script>

<div
  class="FileItem"
  class:selected={selected}
>
  <div class="title">
    <span>{fileItem.title}</span>
  </div>
</div>

<style lang="scss">
  .FileItem {
    padding: 8px;

    &.selected {
      color: tomato;
    }
  }
</style>
