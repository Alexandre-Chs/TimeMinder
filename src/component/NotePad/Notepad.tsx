import { useState } from "react";
import { BiNotepad } from "react-icons/bi";
import "../../styles/Buttons/Notepad.css";
import FloattingTextarea from "./FloattingTextarea";

const Notepad = () => {
  const [openNotepad, setOpenNotepad] = useState(false);

  const handleOpenNodepad = () => {
    setOpenNotepad((current) => !current);
  };

  console.log(openNotepad);
  return (
    <>
      <div className="timeminder-notepadIcon" onClick={handleOpenNodepad}>
        <BiNotepad size={"2rem"} />
      </div>
      {openNotepad ? <FloattingTextarea /> : null}
    </>
  );
};

export default Notepad;
