import "../styles/ButtonOpenSidebar.css";
import { MouseEventHandler } from "../types/SidebarTypes";
import { ReactComponent as Triangle } from "../assets/triangle.svg";

const ButtonSidebar = ({
  handleOpenSidebar,
}: {
  handleOpenSidebar: MouseEventHandler;
}) => {
  return (
    <div className="button-sidebar" onClick={handleOpenSidebar}>
      <Triangle />
    </div>
  );
};

export default ButtonSidebar;
