import Triangle from "../assets/Triangle";
import "../styles/ButtonOpenSidebar.css";
import { MouseEventHandler } from "../types/SidebarTypes";

const ButtonSidebar = ({
  handleOpenSidebar,
  mouseOnRightScreen,
  isOpen,
}: {
  handleOpenSidebar: MouseEventHandler;
  mouseOnRightScreen: boolean;
  isOpen: boolean;
}) => {
  return (
    <div onClick={handleOpenSidebar}>
      <Triangle mouseOnRightScreen={mouseOnRightScreen} isOpen={isOpen} />
    </div>
  );
};

export default ButtonSidebar;
