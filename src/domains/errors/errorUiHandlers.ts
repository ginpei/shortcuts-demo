import { toError } from "./errorHandlers";

export function showError(errorish: unknown): void {
  const error = toError(errorish);
  console.error(error);
  window.alert(`ERROR: ${error.message}`);
}
