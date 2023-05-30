import "../../styles/Timer/TimerPopup.css";
import CountdownTimer from "./CountdownTimer";

const TimerPopup = ({ isTimerOpen }: { isTimerOpen: boolean }) => {
  return (
    <div className="timeminder-timerPopup">
      <div className="timeminder-timerContent">
        <CountdownTimer isTimerOpen={isTimerOpen} />
      </div>
      <div className="timeminder-todolistContent">todolist ici</div>
    </div>
  );
};

export default TimerPopup;
