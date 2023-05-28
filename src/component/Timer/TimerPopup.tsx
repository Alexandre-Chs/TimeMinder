import "../../styles/Timer/TimerPopup.css";
import CountdownTimer from "./CountdownTimer";

const TimerPopup = ({
  isTimerOpen,
  timeBetweenClone,
}: {
  isTimerOpen: boolean;
  timeBetweenClone: object;
}) => {
  return (
    <div className="timeminder-timerPopup">
      <div className="timeminder-timerContent">
        <CountdownTimer
          isTimerOpen={isTimerOpen}
          timeBetweenClone={timeBetweenClone}
        />
      </div>
      <div className="timeminder-todolistContent">todolist ici</div>
    </div>
  );
};

export default TimerPopup;
