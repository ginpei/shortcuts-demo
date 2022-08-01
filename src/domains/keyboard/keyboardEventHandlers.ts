export function toKeyCombination(event: KeyboardEvent): string {
  const {
    altKey,
    ctrlKey,
    metaKey,
    shiftKey,
    key,
  } = event;

  const keyCombination = [
    ctrlKey || metaKey ? "Ctrl+" : "",
    altKey ? "Alt+" : "",
    shiftKey ? "Shift+" : "",
    key,
  ]
    .filter((v) => Boolean(v))
    .join("");

  return keyCombination;
}
