<script lang="ts">
  import CanvasPane from "./CanvasPane.svelte";
  import "./EditorPage.scss";
  import FileListPane from "./fileList/FileListPane.svelte";
  import ToolbarPane from "./ToolbarPane.svelte";
</script>

<div class="EditorPage">
  <div class="pane" style="grid-area: toolbar"><ToolbarPane /></div>
  <div class="pane" style="grid-area: list"><FileListPane /></div>
  <div class="pane" style="grid-area: canvas"><CanvasPane /></div>
</div>

<style lang="scss">
  .EditorPage {
    display: grid;
    grid-template:
      "toolbar toolbar" 30px
      "list    canvas " auto
      / 20rem auto;
    height: 100vh;
    overflow: hidden;
    width: 100vw;
  }

  .pane {
    display: grid;
    overflow: hidden;
  }
</style>
