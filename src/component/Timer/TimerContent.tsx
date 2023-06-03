import "../../styles/Buttons/Timer.css";
import { MdOutlineTimer } from "react-icons/md";
import { useState, useEffect } from "react";
import TimerPopup from "./TimerPopup";

const TimerContent = () => {
  const [isTimerOpen, setTimerIsOpen] = useState(false);
  const handleClick = () => {
    setTimerIsOpen((current) => !current);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTimerIsOpen(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      <div className="timeminder-timerIcon" onClick={handleClick}>
        <MdOutlineTimer size={"2em"} className="timeminder-timerIconSidebar" />
      </div>
      {isTimerOpen ? <TimerPopup isTimerOpen={isTimerOpen} /> : null}
    </>
  );
};

export default TimerContent;
