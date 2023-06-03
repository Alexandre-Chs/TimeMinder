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

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.target.value = "";
  };

  return (
    <div className="timeminder-countdownContent">
      <div className="timeminder-countdownInput">
        <input
          className="timeminder-inputTimer"
          onBlur={handleBlur}
          value={hours}
          onChange={changeHours}
          onFocus={handleFocus}
        />
        <label className="timeminder-countdownLabel">HOURS</label>
      </div>
      <div className="timeminder-countdownInput">
        <input
          className="timeminder-inputTimer"
          onBlur={handleBlur}
          value={minutes}
          onChange={changeMinutes}
          onFocus={handleFocus}
        />
        <label className="timeminder-countdownLabel">MINUTES</label>
      </div>
      <div className="timeminder-countdownInput">
        <input
          className="timeminder-inputTimer"
          onBlur={handleBlur}
          value={seconds}
          onChange={changeSeconds}
          onFocus={handleFocus}
        />
        <label className="timeminder-countdownLabel">SECONDS</label>
      </div>
    </div>
  );
}
