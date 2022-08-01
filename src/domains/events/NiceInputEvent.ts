export type NiceInputEvent = Event & {
  currentTarget: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
}
