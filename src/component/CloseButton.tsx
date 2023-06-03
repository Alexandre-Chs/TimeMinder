import { IoCloseSharp } from "react-icons/io5";
import "../styles/Buttons/CloseButton.css";
import { useSidebarContext } from "../context/SidebarContext";

const CloseButton = () => {
  const { handleOpenSidebar } = useSidebarContext();
  return (
    <div className="timeminder-closeIcon">
      <IoCloseSharp
        size={"2em"}
        className="timeminder-closeIconSidebar"
        onClick={handleOpenSidebar}
      />
    </div>
  );
};

export default CloseButton;
