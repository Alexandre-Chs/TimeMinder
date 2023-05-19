import { useState, useEffect } from "react";
import { BiNotepad } from "react-icons/bi";
import "../../styles/Buttons/Notepad.css";
import FloattingTextarea from "./FloattingTextarea";
import { useSidebarContext } from "../../context/SidebarContext";

const Notepad = () => {
  const [openNotepad, setOpenNotepad] = useState(false);
  const { openSidebar } = useSidebarContext();
  const [notification, setNotification] = useState(false);

  const handleOpenNodepad = () => {
    setOpenNotepad((current) => !current);
  };

  useEffect(() => {
    const isCookieExisted = () => {
      const cookies = document.cookie.split("; ");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (
          cookie[0] === "timefinderNotepadCookie" &&
          atob(decodeURIComponent(cookie[1])) !== ""
        ) {
          setNotification(true);
        }
      }
    };
    isCookieExisted();
  }, [openSidebar]);

  return (
    <>
      <div className="timeminder-notepadIcon" onClick={handleOpenNodepad}>
        <BiNotepad size={"2rem"} />
        {notification ? <div className="notification"></div> : null}
      </div>
      {openNotepad ? <FloattingTextarea isOpen={openNotepad} /> : null}
    </>
  );
};

export default Notepad;
