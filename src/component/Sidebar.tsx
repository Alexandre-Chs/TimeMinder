import "../styles/Sidebar.css";
import BlockSite from "./BlockSite/BlockSite";
import CloseButton from "./CloseButton";
import FocusMode from "./FocusMode/FocusMode";
import Notepad from "./NotePad/Notepad";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={
        isOpen ? "timeminder-sidebar timeminder-active" : "timeminder-sidebar"
      }
    >
      <FocusMode />
      <Notepad />
      <BlockSite />
      <CloseButton />
    </div>
  );
};

export default Sidebar;
