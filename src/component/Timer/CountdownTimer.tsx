import { useState, useEffect } from "react";
import Timer from "./Timer";
import "../../styles/Timer/TimerPopup.css";
export default function CountdownTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  //END of time
  const [showEndScreen, setShowEndScreen] = useState({
    show: false,
    message: "Timer countdown",
  });
  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        if (milliseconds > 0) {
          setMilliseconds((milliseconds) => milliseconds - 1);
        } else if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
          setMilliseconds(99);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
          setMilliseconds(99);
        } else if (hours > 0) {
          setHours((hours) => hours - 1);
          setMinutes(59);
          setSeconds(59);
          setMilliseconds(99);
        }
      }, 10);
    }

    if (hours === 0 && minutes === 0 && seconds === 0 && milliseconds === 1) {
      setShowEndScreen({ ...showEndScreen, show: true });
      resetTimer();
    }

    return () => {
      clearInterval(interval);
    };
  }, [milliseconds, seconds, minutes, hours, isRunning, showEndScreen.show]);

  //Start / Pause / Stop
  const startTimer = () => {
    if (hours !== 0 || minutes !== 0 || seconds !== 0 || milliseconds !== 0) {
      setIsRunning(true);
      setShowEndScreen({ ...showEndScreen, show: false });
    } else {
      window.alert("Add time");
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const stopTimer = () => {
    resetTimer();
    setShowEndScreen({ ...showEndScreen, show: false });
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMilliseconds(0);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };
  //Handlers
  const changeSeconds = (e) => {
    setSeconds(e.target.value);
  };

  const changeMinutes = (e) => {
    setMinutes(e.target.value);
  };

  const changeHours = (e) => {
    setHours(e.target.value);
  };

  useEffect(() => {
    if (isRunning) {
      chrome.runtime.sendMessage({
        message: "startTimer",
        hours: hours,
        minutes: minutes,
      });
    }
  }, [minutes, hours]);

  console.log(hours);
  return (
    <>
      <div className="timeminder-containerTimer">
        {showEndScreen.show && <h1>{showEndScreen.message}</h1>}
        <Timer
          milliseconds={milliseconds}
          seconds={seconds}
          minutes={minutes}
          hours={hours}
          changeSeconds={changeSeconds}
          changeMinutes={changeMinutes}
          changeHours={changeHours}
        />
      </div>
      <br />

      {!isRunning && <button onClick={startTimer}>PLAY</button>}

      {isRunning && <button onClick={pauseTimer}>PAUSE</button>}
      <button onClick={stopTimer}>STOP</button>
    </>
  );
}
