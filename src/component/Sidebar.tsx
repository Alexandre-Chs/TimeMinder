import "../styles/ButtonOpenSidebar.css";
import { MouseEventHandler } from "../types/SidebarTypes";

const Sidebar = ({
  handleOpenSidebar,
}: {
  handleOpenSidebar: MouseEventHandler;
}) => {
  return (
    <div className="sidebar">
      <div onClick={handleOpenSidebar}>X</div>
      <div className="firstIcone">logo</div>
    </div>
  );
};

export default Sidebar;
