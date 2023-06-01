import "../../styles/Timer/TimerPopup.css";
import CountdownTimer from "./CountdownTimer";

const TimerPopup = ({ isTimerOpen }: { isTimerOpen: boolean }) => {
  return (
    <div className="timeminder-timerPopup">
      <CountdownTimer isTimerOpen={isTimerOpen} />
    </div>
  );
};

export default TimerPopup;
