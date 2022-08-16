<script context="module" lang="ts">
  export type IconType = "solid";
</script>

<script lang="ts">
  import type { IconName } from "./IconName";

  export let name: IconName;
  export let type: IconType = "solid";
  export let size: string | undefined = undefined;

  $: style = size ? `--icon--size: ${size};` : "";

  const pSvgFile = import(`./svg/${name}-${type}.svg?raw`);
  pSvgFile.catch((error) => {
    console.error(error);
  });
</script>

<i class="Icon" {style}>
  {#await pSvgFile then { default: svgCode }}
    {@html svgCode}
  {:catch}
    <span class="error">?</span>
  {/await}
</i>


<style lang="scss">
  .Icon {
    --icon--size: 1.5ex;
    display: inline-block;
    height: var(--icon--size);
    width: var(--icon--size);

    & > :global(svg) {
      fill: currentColor;
      height: 100%;
      width: 100%;
    }
  }
</style>
