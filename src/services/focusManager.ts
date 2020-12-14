import { useEffect, useState } from "react";

export function useFocusManager(targetWindow = window): [string] {
  const [elFocussed, setElFocussed] = useState<Element | null>(null);
  const [focusName, setFocusName] = useState("");

  useEffect(() => {
    targetWindow.addEventListener("pointerdown", onPointerDown);
    return () => targetWindow.removeEventListener("pointerdown", onPointerDown);

    function onPointerDown(event: PointerEvent) {
      // turn of the prev target
      if (elFocussed) {
        elFocussed.toggleAttribute("data-focus", false);
      }

      // turn on the next target
      const elFocusable = getClosestFocusable(event.target);
      if (elFocusable) {
        elFocusable.toggleAttribute("data-focus", true);
      }

      const type = getFocusType(elFocusable);
      setFocusName(type);
      setElFocussed(elFocusable);
    }
  }, [elFocussed]);

  return [focusName];
}

function getClosestFocusable(el: EventTarget | null): Element | null {
  if (!(el instanceof Element)) {
    return null;
  }

  return el.closest("[data-focus-name]");
}

function getFocusType(el: Element | null): string {
  if (!el) {
    return "";
  }

  const type = el.getAttribute("data-focus-name");
  if (type === null) {
    throw new Error("Focus name must be set in data-focus-name attr");
  }

  return type;
}
