import "../../styles/Timer/TimerPopup.css";
import CountdownTimer from "./CountdownTimer";

const TimerPopup = () => {
  return (
    <div className="timeminder-timerPopup">
      <div className="timeminder-timerContent">
        <CountdownTimer />
      </div>
      <div className="timeminder-todolistContent">todolist ici</div>
    </div>
  );
};

export default TimerPopup;
