import "../styles/Sidebar.css";
import { MouseEventHandler } from "../types/SidebarTypes";
import { BsRocketTakeoff } from "react-icons/bs";
import { CgClose } from "react-icons/cg";

const Sidebar = ({
  handleOpenSidebar,
  isOpen,
}: {
  handleOpenSidebar: MouseEventHandler;
  isOpen: boolean;
}) => {
  return (
    <div className={isOpen ? "sidebar active" : "sidebar"}>

    </div>
  );
};

export default Sidebar;
