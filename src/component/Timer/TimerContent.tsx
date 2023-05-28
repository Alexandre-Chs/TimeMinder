import "../../styles/Buttons/Timer.css";
import { MdOutlineTimer } from "react-icons/md";
import { useState } from "react";
import TimerPopup from "./TimerPopup";
import { calculateMsToTime } from "../../utils/CalculateMsToTime";

const TimerContent = () => {
  const [isTimerOpen, setTimerIsOpen] = useState(false);
  const [timeBetweenClone, setTimeBetweenClone] = useState({});
  const handleClick = () => {
    setTimerIsOpen((current) => !current);
  };

  // if (isTimerOpen) {
  //   chrome.storage.local.get(
  //     ["dateWhenStart", "totalMilliseconds"],
  //     (result) => {
  //       const currentTime = new Date().getTime();
  //       const timeBetweenClose =
  //         Number(currentTime) - Number(result.dateWhenStart);
  //       const time = calculateMsToTime(timeBetweenClose);
  //       setTimeBetweenClone(time);
  //     }
  //   );
  // }

  return (
    <>
      <div className="timeminder-timerIcon" onClick={handleClick}>
        <MdOutlineTimer size={"2em"} />
      </div>
      {isTimerOpen ? (
        <TimerPopup
          isTimerOpen={isTimerOpen}
          timeBetweenClone={timeBetweenClone}
        />
      ) : null}
    </>
  );
};

export default TimerContent;
