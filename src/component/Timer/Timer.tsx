import React from "react";
import "../../styles/Timer/CountdownTimer.css";

export default function Timer({
  milliseconds,
  seconds,
  minutes,
  hours,
  changeHours,
  changeMinutes,
  changeSeconds,
}) {
  return (
    <div className="timeminder-countdownContent">
      <div className="timeminder-countdownInput">
        <label>hh</label>
        <input value={hours} onChange={changeHours} />
      </div>
      <div className="timeminder-countdownInput">
        <label>mm</label>
        <input value={minutes} onChange={changeMinutes} />
      </div>
      <div className="timeminder-countdownInput">
        <label>ss</label>
        <input value={seconds} onChange={changeSeconds} />
      </div>
      <div className="timeminder-countdownInput">
        <label>ms</label>
        <input value={milliseconds} />
      </div>
    </div>
  );
}
