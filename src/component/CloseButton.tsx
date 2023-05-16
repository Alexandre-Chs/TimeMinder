import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import "../styles/Buttons/CloseButton.css";

const CloseButton = () => {
  return (
    <div className="timeminder-closeIcon">
      <IoCloseSharp size={"2.5em"} />
    </div>
  );
};

export default CloseButton;
