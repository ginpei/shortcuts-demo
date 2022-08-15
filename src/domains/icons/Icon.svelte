<script context="module" lang="ts">
  export type IconType = "solid";
</script>

<script lang="ts">
  import type { IconName } from "./IconName";

  export let name: IconName;
  export let type: IconType = "solid";

  const pSvgFile = import(`./svg/${name}-${type}.svg?raw`);
  pSvgFile.catch((error) => {
    console.error(error);
  });
</script>

<i class="Icon">
  {#await pSvgFile then { default: svgCode }}
    {@html svgCode}
  {:catch}
    <span class="error">?</span>
  {/await}
</i>


<style lang="scss">
  .Icon {
    display: inline-block;
    height: 1em;
    width: 1em;

    & > :global(svg) {
      fill: currentColor;
      height: 1em;
      width: 1em;
    }
  }
</style>
