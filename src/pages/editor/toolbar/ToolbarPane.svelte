<script lang="ts">
  import Logo from "./Logo.svelte";
  import ToolbarButton from "./ToolbarButton.svelte";
</script>

<div class="ToolbarPane">
  <a class="logoLink" href="/">
    <Logo />
  </a>
  <div class="contents">
    <div class="primary">
      <ToolbarButton>💬</ToolbarButton>
    </div>
    <div class="secondary">
      <ToolbarButton>➕</ToolbarButton>
      <ToolbarButton>🔍</ToolbarButton>
    </div>
  </div>
</div>

<style lang="scss">
  .ToolbarPane {
    --toolbar--background-color--hover: #333;
    --toolbar--background-color: black;
    --toolbar--color: white;
    background-color: var(--toolbar--background-color);
    color: var(--toolbar--color);
    display: flex;
    overflow: auto;
    gap: 8px;
  }

  .logoLink {
    overflow: hidden;
  }

  .contents {
    display: flex;
    justify-content: space-between;
    flex: 1;
  }

  .primary,
  .secondary {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
</style>
