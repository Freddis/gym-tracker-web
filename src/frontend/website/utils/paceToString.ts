export const paceToString = (pace: number) => {
  const minutes = Math.floor(pace / 60);
  const seconds = pace % 60;
  return `${minutes}:${seconds.toLocaleString(undefined, {minimumIntegerDigits: 2})}`;
};
