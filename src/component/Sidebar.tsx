import "../styles/Sidebar.css";
import { MouseEventHandler } from "../types/SidebarTypes";
import CloseButton from "./CloseButton";
import FocusMode from "./FocusMode/FocusMode";

const Sidebar = ({
  handleOpenSidebar,
  isOpen,
}: {
  handleOpenSidebar: MouseEventHandler;
  isOpen: boolean;
}) => {
  return (
    <div
      className={
        isOpen ? "timeminder-sidebar timeminder-active" : "timeminder-sidebar"
      }
    >
      <FocusMode />
      <CloseButton />
    </div>
  );
};

export default Sidebar;
