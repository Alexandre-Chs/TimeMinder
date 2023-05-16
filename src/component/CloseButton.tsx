import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import "../styles/Buttons/CloseButton.css";
import { useSidebarContext } from "../context/SidebarContext";

const CloseButton = () => {
  const { handleOpenSidebar } = useSidebarContext();
  return (
    <div className="timeminder-closeIcon">
      <IoCloseSharp size={"2em"} onClick={handleOpenSidebar} />
    </div>
  );
};

export default CloseButton;
