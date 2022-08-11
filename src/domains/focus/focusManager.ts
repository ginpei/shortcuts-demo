import type { Unsubscriber, Writable } from "svelte/store";
import { runEachAnimationFrame } from "../timer/animationFrameHandlers";

export interface FocusState {
  focus: string;
}

const focusableTagNames = ["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA"] as const;
const focusableSelector = `:where(${focusableTagNames.join(",")},[tabindex]):not(:disabled,.disabled,[tabindex="-1"])`;

// TODO extract
export function bindFocusToStore(store: Writable<FocusState>): Unsubscriber {
  return onFocusChange((elFocus) => {
    const focus = elFocus ? elFocus.id : '';
    store.update((state) => ({ ...state, focus }));
  });
}

export function setFocus(id: string, d: Document | Element = document): boolean {
  const el = id === "" ? null : d.querySelector(`#${id}`);
  if (!(el instanceof HTMLElement)) {
    if (id !== "") {
      console.warn(`Focus target not found: ${id}`);
    }

    const activeElement = d.ownerDocument?.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }

    return false;
  }

  el.focus();
  return true;
}

export function onFocusChange(
  listener: (el: Element | null) => void,
  root: Document | Element = document,
): Unsubscriber {
  const d = root instanceof Document ? root : root.ownerDocument;
  if (!d) {
    return () => undefined;
  }

  let elFocus = d.activeElement;
  return runEachAnimationFrame(() => {
    const elNewFocus = d.activeElement;
    if (elNewFocus !== elFocus) {
      listener(elNewFocus);
      elFocus = elNewFocus;
    }
  });
}

// TODO remove later or use
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
