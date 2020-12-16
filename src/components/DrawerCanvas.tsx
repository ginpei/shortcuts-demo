import { useEffect, useMemo, useRef, useState } from "react";
import { cn, HtmlComponent } from "../misc";
import { createPosFromEvent, Pos } from "../models/Pos";
import "./DrawerCanvas.scss";

export const DrawerCanvas: HtmlComponent<"canvas"> = ({
  className,
  ...props
}) => {
  const refCanvas = useRef<HTMLCanvasElement>(null);
  useCanvasPen(refCanvas);

  const rootClassName = useMemo(() => {
    return cn([className, "DrawerCanvas"]);
  }, [className]);

  useEffect(() => {
    // TODO remove timeout
    setTimeout(() => fillBackground(refCanvas), 1);
  }, [refCanvas]);

  return <canvas {...props} className={rootClassName} ref={refCanvas} />;
};

function fillBackground(
  refCanvas: React.RefObject<HTMLCanvasElement>,
  style = "white"
) {
  const el = refCanvas.current;
  if (!el) {
    return;
  }

  const c = el.getContext("2d");
  if (!c) {
    throw new Error("Failed to get canvas context");
  }

  c.fillStyle = style;
  c.fillRect(0, 0, el.width, el.height);
}

function useCanvasPen(refCanvas: React.RefObject<HTMLCanvasElement>) {
  const elCanvas = refCanvas.current;

  const [pointerId, setPointerId] = useState(0);
  const [lastPos, setLastPos] = useState<Pos | null>(null);

  useEffect(() => {
    if (!elCanvas) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    }

    elCanvas.addEventListener("pointerdown", onPointerDown);
    elCanvas.addEventListener("pointermove", onPointerMove);
    elCanvas.addEventListener("pointerup", onPointerUp);
    elCanvas.addEventListener("pointercancel", onPointerUp);
    return () => {
      elCanvas.removeEventListener("pointerdown", onPointerDown);
      elCanvas.removeEventListener("pointermove", onPointerMove);
      elCanvas.removeEventListener("pointerup", onPointerUp);
      elCanvas.removeEventListener("pointercancel", onPointerUp);
    };

    function onPointerDown(event: PointerEvent) {
      const pos = createPosFromEvent(event);

      elCanvas?.setPointerCapture(event.pointerId);

      setLastPos(pos);
      setPointerId(event.pointerId);
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerId !== pointerId) {
        return;
      }

      const pos = createPosFromEvent(event);
      const c = elCanvas?.getContext("2d");
      if (c && lastPos) {
        c.moveTo(lastPos.x, lastPos.y);
        c.lineTo(pos.x, pos.y);
        c.strokeStyle = "#333";
        c.stroke();
      }

      setLastPos(pos);
    }

    function onPointerUp(event: PointerEvent) {
      if (event.pointerId !== pointerId) {
        return;
      }
      console.log("# up", event.type);

      const pos = createPosFromEvent(event);
      const c = elCanvas?.getContext("2d");
      if (c && lastPos) {
        c.moveTo(lastPos.x, lastPos.y);
        c.lineTo(pos.x, pos.y);
        c.stroke();
      }

      elCanvas?.releasePointerCapture(pointerId);

      setPointerId(0);
      setLastPos(null);
    }
  }, [elCanvas, pointerId, setPointerId, lastPos, setLastPos]);

  useEffect(() => console.log("# lastPos?", lastPos), [lastPos]);
}
