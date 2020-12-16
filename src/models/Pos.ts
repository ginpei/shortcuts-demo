export interface Pos {
  x: number;
  y: number;
}

export function createPosFromEvent(event: PointerEvent): Pos {
  return { x: event.offsetX, y: event.offsetY };
}
