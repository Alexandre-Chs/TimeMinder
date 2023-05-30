import { useState, useEffect } from "react";
import Timer from "./Timer";
import "../../styles/Timer/TimerPopup.css";
import { calculateTotalMilliseconds } from "../../utils/CalculateToMilliseconds";
import { calculateMsToTime } from "../../utils/CalculateMsToTime";
import sound from "../../assets/sound/ding.mp3";

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
  const [isPause, setIsPause] = useState(false);

  //END of time
  const [showEndScreen, setShowEndScreen] = useState({
    show: false,
    message: "Timer countdown",
  });

  useEffect(() => {
    let interval: number;
    let remainingTime: number =
      hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;

    if (isRunning && remainingTime > 0) {
      interval = setInterval(() => {
        remainingTime -= 10;
        if (remainingTime <= 0) {
          remainingTime = 0;
          clearInterval(interval);
          setShowEndScreen({ ...showEndScreen, show: true });
          resetTimer();
          chrome.runtime.sendMessage({
            message: "stopTimer",
          });
        }

        const updatedHours = Math.floor(remainingTime / 3600000);
        const updatedMinutes = Math.floor((remainingTime % 3600000) / 60000);
        const updatedSeconds = Math.floor((remainingTime % 60000) / 1000);
        const updatedMilliseconds = remainingTime % 1000;

        setHours(updatedHours);
        setMinutes(updatedMinutes);
        setSeconds(updatedSeconds);
        setMilliseconds(updatedMilliseconds);
      }, 10);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    milliseconds,
    seconds,
    minutes,
    hours,
    isRunning,
    showEndScreen.show,
    isTimerOpen,
  ]);

  //Start / Pause / Stop
  const startTimer = () => {
    if (hours !== 0 || minutes !== 0 || seconds !== 0 || milliseconds !== 0) {
      setIsRunning(true);
      setShowEndScreen({ ...showEndScreen, show: false });

      const time = new Date().getTime();
      const totalMilliseconds = calculateTotalMilliseconds({
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        milliseconds: milliseconds,
      });

      chrome.storage.local
        .set({
          ["dateWhenStart"]: time,
          ["totalMilliseconds"]: totalMilliseconds,
          ["pause"]: false,
        })
        .then(() => {
          console.log(
            "L'heure du start : " +
              time +
              " et le total en ms :" +
              totalMilliseconds
          );
        });
    } else {
      window.alert("Add time");
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    // Mettre en pause le temps dans chrome.storage.local
    const time = new Date().getTime();
    const totalMilliseconds = calculateTotalMilliseconds({
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      milliseconds: milliseconds,
    });

    chrome.storage.local
      .set({
        ["dateWhenStart"]: time,
        ["totalMilliseconds"]: totalMilliseconds,
        ["pause"]: true,
      })
      .then(() => {
        console.log(
          "PAUSE : L'heure du start : " +
            time +
            " et le total en ms :" +
            totalMilliseconds
        );
      });

    chrome.runtime.sendMessage({
      message: "pauseTimer",
    });
  };

  const stopTimer = () => {
    resetTimer();
    setShowEndScreen({ ...showEndScreen, show: false });
    chrome.runtime.sendMessage({
      message: "stopTimer",
    });

    const defaultValues = {
      dateWhenStart: null,
      totalMilliseconds: 0,
      pause: false,
    };

    chrome.storage.local.set(defaultValues, () => {
      console.log("Timer values reset to default.");
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
      const totalMilliseconds = calculateTotalMilliseconds({
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        milliseconds: milliseconds,
      });

      chrome.runtime.sendMessage({
        message: "startTimer",
        timeRemaining: totalMilliseconds,
      });
    }
  }, [isRunning]);

  useEffect(() => {
    chrome.storage.local.get(
      ["dateWhenStart", "totalMilliseconds", "pause"],
      (result) => {
        const currentTime = new Date().getTime();
        const timeBetweenClose =
          Number(currentTime) - Number(result.dateWhenStart);
        const initialChrono = result.totalMilliseconds;
        const finalChrono = initialChrono - timeBetweenClose;
        const msToChrono = calculateMsToTime(finalChrono);
        if (
          !result.pause &&
          !isRunning &&
          msToChrono.hours >= 0 &&
          msToChrono.minutes >= 0 &&
          msToChrono.seconds >= 0 &&
          msToChrono.milliseconds >= 0
        ) {
          setHours(msToChrono.hours);
          setMinutes(msToChrono.minutes);
          setSeconds(msToChrono.seconds);
          setMilliseconds(msToChrono.milliseconds);
          setIsRunning(true);
        }

        if (result.pause) {
          const timerWhenPaused = calculateMsToTime(result.totalMilliseconds);
          setHours(timerWhenPaused.hours);
          setMinutes(timerWhenPaused.minutes);
          setSeconds(timerWhenPaused.seconds);
          setMilliseconds(timerWhenPaused.milliseconds);
        }
      }
    );
  }, [isTimerOpen, isPause]);

  // if (showEndScreen.show === true) {
  //   const audioContext = new AudioContext();
  //   const audioElement = new Audio(sound);
  //   const source = audioContext.createMediaElementSource(audioElement);
  //   source.connect(audioContext.destination);
  //   audioElement.play();
  //   console.log("play");
  // }

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
      <audio controls src={sound}></audio>

      {!isRunning && <button onClick={startTimer}>PLAY</button>}

      {isRunning && <button onClick={pauseTimer}>PAUSE</button>}
      <button onClick={stopTimer}>STOP</button>
    </>
  );
}
