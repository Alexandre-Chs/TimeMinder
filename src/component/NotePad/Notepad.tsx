import { useState } from "react";
import { BiNotepad } from "react-icons/bi";
import "../../styles/Buttons/Notepad.css";

const Notepad = () => {
  const [openNotepad, setOpenNotepad] = useState(false);

  const handleOpenNodepad = () => {
    setOpenNotepad((current) => !current);
  };

  return (
    <div className="timeminder-notepadIcon" onClick={handleOpenNodepad}>
      <BiNotepad size={"2rem"} />
    </div>
  );
};

export default Notepad;
