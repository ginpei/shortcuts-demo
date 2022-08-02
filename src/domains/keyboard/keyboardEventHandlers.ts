const keyRenameMap = {
  " ": "Space",
} as const;

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
    renameEventKey(key),
  ]
    .filter((v) => Boolean(v))
    .join("");

  return keyCombination;
}

function renameEventKey(key: string): string {
  return (keyRenameMap as Record<string, string>)[key] || key;
}
