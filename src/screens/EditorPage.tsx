import { useEffect } from "react";
import { EditorCanvas } from "../components/EditorCanvas";
import { EditorNotepad } from "../components/EditorNotepad";
import { EditorSidebar } from "../components/EditorSidebar";
import { useFocusManager } from "../services/focusManager";
import "./EditorPage.scss";

type FocusType = "" | "sidebar" | "canvas" | "notepad";

export const EditorPage: React.FC = () => {
  const [focusName] = useFocusManager();

  return (
    <div className="HomePage">
      <div className="HomePage-layout">
        <div
          className="HomePage-layoutItem HomePage-sidebar"
          data-focus-name="sidebar"
        >
          <EditorSidebar />
        </div>
        <div
          className="HomePage-layoutItem HomePage-canvas"
          data-focus-name="canvas"
        >
          <EditorCanvas />
        </div>
        <div
          className="HomePage-layoutItem HomePage-notepad"
          data-focus-name="notepad"
        >
          <EditorNotepad />
        </div>
      </div>
    </div>
  );
};
