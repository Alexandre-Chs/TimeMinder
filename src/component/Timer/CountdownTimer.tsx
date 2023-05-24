import { useState, useEffect } from "react";
import Timer from "./Timer";
import "../../styles/Timer/TimerPopup.css";

export default function CountdownTimer({
  isTimerOpen,
}: {
  isTimerOpen: boolean;
}) {
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
      chrome.runtime.sendMessage({
        message: "stopTimer",
      });
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
    chrome.runtime.sendMessage({
      message: "stopTimer",
    });
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMilliseconds(0);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  //Handlers
  const valideInput = (value: string): boolean | undefined => {
    const regex = /[0-9]+/;
    const test = regex.test(value);
    if (test === true && value.length <= 2) {
      return test;
    } else {
      return;
    }
  };

  const changeSeconds = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const validSeconds: boolean | undefined = valideInput(e.target.value);
    if (validSeconds || e.target.value === "") {
      if (Number(e.target.value) >= 60) {
        e.target.value = "0";
      }
      setSeconds(Number(e.target.value));
    }
  };

  const changeMinutes = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const validMinutes: boolean | undefined = valideInput(e.target.value);
    if (validMinutes || e.target.value === "") {
      setMinutes(Number(e.target.value));
    }
  };

  const changeHours = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const validHours: boolean | undefined = valideInput(e.target.value);
    if (validHours || e.target.value === "") {
      setHours(Number(e.target.value));
    }
  };

  useEffect(() => {
    if (isRunning) {
      chrome.runtime.sendMessage({
        message: "startTimer",
        hours: hours,
        minutes: minutes,
      });

      chrome.storage.local
        .set({
          ["timerHoursStorage"]: hours,
          ["timerMinutesStorage"]: minutes,
          ["timerSecondsStorage"]: seconds,
        })
        .then(() => {
          console.log(seconds);
        });
    }
  }, [minutes, hours, seconds]);

  useEffect(() => {
    chrome.storage.local.get("timerSecondsStorage", (result) => {
      console.log(result);
      setSeconds(result.timerSecondsStorage);
    });
  }, [isTimerOpen]);

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
