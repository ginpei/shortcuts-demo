<script lang="ts">
  import { getFileList } from "./fileListData";
  import FileListItem from "./FileListItem.svelte";

  const fileList = getFileList();

  let selectedFileItemId = fileList[0].id;
</script>

<section class="FileListPane">
  <h1 class="heading">File list</h1>
  <div class="list">
    {#each fileList as fileItem}
      <div class="item">
        <FileListItem
          {fileItem}
          selected={fileItem.id === selectedFileItemId}
        />
      </div>
    {/each}
  </div>
</section>

<style lang="scss">
  .FileListPane {
    display: grid;
    grid-template-rows: 2rem auto;
    overflow: hidden;
  }

  .heading {
    font-size: 1rem;
    margin: 0;
  }

  .list {
    overflow: auto;
    padding-bottom: calc(8px * 10);
  }

  .item {
    border-bottom: thin solid lightgray;
  }
</style>
