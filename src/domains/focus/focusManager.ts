import { tick } from "svelte";
import type { Unsubscriber, Writable } from "svelte/store";

export type FocusRecord<FocusType extends string> = Record<
  FocusType,
  string | ((elRoot: HTMLElement) => string) | null
>;

export interface FocusState<FocusType extends string> {
  focus: FocusType;
}

const focusableTagNames = ["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA"] as const;
const focusableSelector = `:where(${focusableTagNames.join(",")},[tabindex]):not(:disabled,.disabled,[tabindex="-1"])`;

export function startAppFocusHandler<FocusType extends string>(
  map: FocusRecord<FocusType>,
  store: Writable<FocusState<FocusType | ''>>,
): Unsubscriber {
  return store.subscribe(async ({ focus }) => {
    if (focus !== '' && !(focus in map)) {
      throw new Error(`Unknown focus type: ${focus}`);
    }

    // let screen get rendered so that input can get disabled off
    await tick();

    const elFocusable = getFocusTarget(focus, map);
    if (elFocusable) {
      elFocusable.focus();

      if (elFocusable instanceof HTMLInputElement) {
        elFocusable.select();
      }
    } else {
      const elCur = document.activeElement;
      if (elCur instanceof HTMLElement) {
        elCur.blur();
      }
    }
  });
}

export function createFocusMap<FocusType extends string>(
  map: FocusRecord<FocusType>,
): FocusRecord<FocusType> {
  return map;
}

function getFocusTarget<FocusType extends string>(
  focus: FocusType | '',
  map: FocusRecord<FocusType>,
): HTMLElement | null {
  if (focus === '') {
    return null;
  }

  const ref = map[focus];
  if (ref instanceof Element) {
    const elFocusable = findFirstFocusableElement(ref);
    if (elFocusable) {
      return elFocusable;
    }
  } else if (typeof ref === 'string') {
    const elTarget = document.querySelector(ref);
    if (elTarget instanceof HTMLElement) {
      return elTarget
    }
  }

  return null;
}

function findFirstFocusableElement(elRoot: Element): HTMLElement | null {
  if (elRoot instanceof HTMLElement && elRoot.matches(focusableSelector)) {
    return elRoot;
  }

  const el = elRoot.querySelector(focusableSelector);

  if (!(el instanceof HTMLElement)) {
    return null;
  }

  return el;
}
