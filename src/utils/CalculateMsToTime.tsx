type TimeValues = {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

export const calculateMsToTime = (totalMilliseconds: number): TimeValues => {
  const hours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((totalMilliseconds / (1000 * 60)) % 60);
  const seconds = Math.floor((totalMilliseconds / 1000) % 60);
  const milliseconds = Math.floor(totalMilliseconds % 1000);

  return {
    hours,
    minutes,
    seconds,
    milliseconds,
  };
};
