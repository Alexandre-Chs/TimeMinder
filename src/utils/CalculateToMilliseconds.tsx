type calculateMillisecondsProps = {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

export const calculateTotalMilliseconds = ({
  hours,
  minutes,
  seconds,
  milliseconds,
}: calculateMillisecondsProps): number => {
  let totalMilliseconds = 0;

  if (hours) {
    totalMilliseconds += hours * 60 * 60 * 1000;
  }

  if (minutes) {
    totalMilliseconds += minutes * 60 * 1000;
  }

  if (seconds) {
    totalMilliseconds += seconds * 1000;
  }

  totalMilliseconds += milliseconds;

  return totalMilliseconds;
};
