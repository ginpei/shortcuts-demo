import { EditorCanvas } from "../components/EditorCanvas";
import { EditorNotepad } from "../components/EditorNotepad";
import { EditorSidebar } from "../components/EditorSidebar";
import { useFocusManager } from "../services/focusManager";
import {
  KeyboardShortcut,
  useKeyboardShortcuts,
} from "../services/keyboardManager";
import "./EditorPage.scss";

const keyboardShortcuts: readonly KeyboardShortcut[] = [
  {
    command: "sayHello",
    keyBind: [
      {
        key: "A",
        ctrlKey: true,
      },
    ],
    when: ["sidebar"],
  },
];

export const EditorPage: React.FC = () => {
  const [focusName] = useFocusManager();
  useKeyboardShortcuts(keyboardShortcuts, focusName);

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
