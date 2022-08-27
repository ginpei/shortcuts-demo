<script lang="ts">
  import { MenuItem } from "@rgossiaux/svelte-headlessui";

  export let href: string | undefined = undefined;
  export let target: "_blank" | undefined = undefined;
  export let disabled: boolean | undefined = undefined;
</script>

<MenuItem
  as={href ? "a" : "div"}
  class="dropdown--dropdown-menu-item"
  disabled={disabled}
  href={href}
  on:click
  target={target}
>
  <slot />
</MenuItem>

<style lang="scss">
  :global(.dropdown--dropdown-menu-item) {
    color: inherit;
    cursor: pointer;
    display: block;
    padding: 8px;
    text-decoration: none;

    &:hover {
      background-color: #0001;
    }
  }
</style>
