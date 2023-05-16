import "../styles/Sidebar.css";
import CloseButton from "./CloseButton";
import FocusMode from "./FocusMode/FocusMode";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
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
