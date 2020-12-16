import { useCallback, useEffect, useRef, useState } from "react";
import { DrawerCanvas } from "./DrawerCanvas";
import "./EditorCanvas.scss";

type ToolTypes = "pen" | "eraser";

export const EditorCanvas: React.FC = (props) => {
  const refCanvasContainer = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [currentTool, setCurrentTool] = useState<ToolTypes>("pen");

  const onWidthChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.currentTarget.value);
      setWidth(value);
    },
    [setWidth]
  );

  const onHeightChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.currentTarget.value);
      setHeight(value);
    },
    [setHeight]
  );

  useEffect(() => {
    const el = refCanvasContainer.current;
    if (!el) {
      return;
    }

    setWidth(el.clientWidth - 50);
    setHeight(el.clientHeight - 50);
  }, [refCanvasContainer]);

  return (
    <div className="EditorCanvas">
      <div className="EditorCanvas-canvasContainer" ref={refCanvasContainer}>
        <DrawerCanvas
          className="EditorCanvas-canvas"
          height={height}
          width={width}
        />
      </div>
      <div className="EditorCanvas-toolbar">
        <div className="EditorCanvas-toolbarItem">
          Size:
          <input
            name="width"
            onChange={onWidthChange}
            type="number"
            value={width}
          />
          ×
          <input
            name="height"
            onChange={onHeightChange}
            type="number"
            value={height}
          />
        </div>
        <div className="EditorCanvas-toolbarItem">
          Tool:
          <button>Pen</button>
          <button>Eraser</button>
        </div>
      </div>
    </div>
  );
};
