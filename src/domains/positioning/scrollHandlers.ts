export function scrollIntoView(elTarget: HTMLElement): void {
  const elParent = elTarget.parentElement;
  if (!elParent) {
    return;
  }

  const offset = elParent.offsetTop + elParent.scrollTop;
  if (elTarget.offsetTop - offset < 0) {
    elTarget.scrollIntoView(true);
    return;
  }

  const bottom = offset + elParent.clientHeight;
  if (elTarget.offsetTop + elTarget.clientHeight - bottom > 0) {
    elTarget.scrollIntoView(false);
  }
}
