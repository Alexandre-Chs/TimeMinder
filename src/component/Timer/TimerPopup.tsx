import "../../styles/Timer/TimerPopup.css";
import CountdownTimer from "./CountdownTimer";

const TimerPopup = ({ isTimerOpen }: { isTimerOpen: boolean }) => {
  return (
    <div className="timeminder-timerPopup">
      <div className="timeminder-timerContent">
        <CountdownTimer isTimerOpen={isTimerOpen} />
      </div>
    </div>
  );
};

export default TimerPopup;
