<script lang="ts">
  let text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio earum ut debitis quos vitae at commodi. Quidem quisquam assumenda, eveniet totam, nesciunt deserunt at exercitationem quae ipsum, porro voluptate ea.';
</script>

<div class="CanvasPane">
  <textarea bind:value={text} class="text"></textarea>
</div>

<style lang="scss">
  .CanvasPane {
    display: grid;
  }

  .text {
    background-color: #fffffc;
    font-size: 18px;
    padding: 8px;
    resize: none;
  }
</style>
