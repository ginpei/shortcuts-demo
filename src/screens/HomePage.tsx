import { useCallback, useState } from "react";
import { EditorCanvas } from "../components/EditorCanvas";
import { EditorNotepad } from "../components/EditorNotepad";
import { EditorSidebar } from "../components/EditorSidebar";
import "./HomePage.scss";

type FocusType = "" | "sidebar" | "canvas" | "notepad";

export const HomePage: React.FC = () => {
  const [focus, setFocus] = useState<FocusType>("");

  const onLayoutPointerDown: React.PointerEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const focusType = event.currentTarget.getAttribute(
        "data-focus-type"
      ) as FocusType;
      setFocus(focusType);
    },
    [setFocus]
  );

  return (
    <div className="HomePage">
      <div className="HomePage-layout">
        <div
          className="HomePage-layoutItem HomePage-sidebar"
          data-focus-type="sidebar"
          data-focus={focus === "sidebar"}
          onPointerDown={onLayoutPointerDown}
        >
          <EditorSidebar />
        </div>
        <div
          className="HomePage-layoutItem HomePage-canvas"
          data-focus-type="canvas"
          data-focus={focus === "canvas"}
          onPointerDown={onLayoutPointerDown}
        >
          <EditorCanvas />
        </div>
        <div
          className="HomePage-layoutItem HomePage-notepad"
          data-focus-type="notepad"
          data-focus={focus === "notepad"}
          onPointerDown={onLayoutPointerDown}
        >
          <EditorNotepad />
        </div>
      </div>
    </div>
  );
};
