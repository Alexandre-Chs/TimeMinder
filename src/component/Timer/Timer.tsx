import "../../styles/Buttons/Timer.css";
import { MdOutlineTimer } from "react-icons/md";
import { useState } from "react";
import TimerPopup from "./TimerPopup";

const Timer = () => {
  const [isTimerOpen, setTimerIsOpen] = useState(false);
  const handleClick = () => {
    setTimerIsOpen((current) => !current);
  };
  return (
    <>
      <div className="timeminder-timerIcon" onClick={handleClick}>
        <MdOutlineTimer size={"2em"} />
      </div>
      {isTimerOpen ? <TimerPopup /> : null}
    </>
  );
};

export default Timer;
