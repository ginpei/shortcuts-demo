<script lang="ts">
  import { computePosition,type ComputePositionConfig } from '@floating-ui/dom';
  import {
  Menu,
  MenuButton,
  MenuItems
  } from "@rgossiaux/svelte-headlessui";
  import type { Action } from "svelte/types/runtime/action";
  import Button from "../buttons/Button.svelte";

  export let label: string;

  let elButton: HTMLElement;
  let sMenuPositionStyle = "";

  const buttonAction: Action = (node) => {
    elButton = node;
  };

  const menuAction: Action = (elMenu) => {
    const options: Partial<ComputePositionConfig> = {
      placement: 'bottom-start',
      strategy: 'fixed',
    };

    computePosition(elButton, elMenu, options).then((styles) => {
      sMenuPositionStyle = [
        `left: ${styles.x}px`,
        `top: ${styles.y}px`,
      ].join(';');
    });

    return {
      async destroy() {
        sMenuPositionStyle = "";
      },
    };
  };
</script>

<Menu>
  <MenuButton as="span" class="MenuButton" use={[buttonAction]}>
    <Button>{label}</Button>
  </MenuButton>
  <MenuItems
    class="dropdown--menu-items"
    style={sMenuPositionStyle}
    use={[menuAction]}
  >
    <slot />
  </MenuItems>
</Menu>

<style lang="scss">
  :global(.dropdown--menu-items) {
    background-color: #fff;
    border: thin solid gray;
    box-shadow: 4px 4px 8px #0003;
    color: #000;
    min-width: 10em;
    position: fixed;
  }
</style>
