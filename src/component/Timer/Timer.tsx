import "../../styles/Timer/CountdownTimer.css";

export default function Timer({
  milliseconds,
  seconds,
  minutes,
  hours,
  changeHours,
  changeMinutes,
  changeSeconds,
}: {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  changeHours: React.ChangeEventHandler<HTMLInputElement>;
  changeMinutes: React.ChangeEventHandler<HTMLInputElement>;
  changeSeconds: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = e.target.value;
    if (value.length > 0 && Number(value) < 60) {
      return;
    } else {
      e.target.value = "0";
    }
  };

  return (
    <div className="timeminder-countdownContent">
      <div className="timeminder-countdownInput">
        <input
          className="timeminder-inputTimer"
          onBlur={handleBlur}
          value={hours}
          onChange={changeHours}
        />
        <label>HOURS</label>
      </div>
      <div className="timeminder-countdownInput">
        <input
          className="timeminder-inputTimer"
          onBlur={handleBlur}
          value={minutes}
          onChange={changeMinutes}
        />
        <label>MINUTES</label>
      </div>
      <div className="timeminder-countdownInput">
        <input
          className="timeminder-inputTimer"
          onBlur={handleBlur}
          value={seconds}
          onChange={changeSeconds}
        />
        <label>SECONDS</label>
      </div>
    </div>
  );
}
