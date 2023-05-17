import Triangle from "../assets/Triangle";
import { useSidebarContext } from "../context/SidebarContext";
import "../styles/ButtonOpenSidebar.css";

const ButtonSidebar = () => {
  const { handleOpenSidebar } = useSidebarContext();
  return (
    <div onClick={handleOpenSidebar}>
      <Triangle />
    </div>
  );
};

export default ButtonSidebar;
