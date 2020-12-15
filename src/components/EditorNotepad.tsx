import { useState } from "react";
import "./EditorNotepad.scss";

export const EditorNotepad: React.FC = (props) => {
  const [text, setText] = useState("");

  const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    setText(value);
  };

  return (
    <div className="EditorNotepad">
      <textarea
        className="EditorNotepad-text"
        onChange={onTextChange}
        value={text}
      />
    </div>
  );
};
