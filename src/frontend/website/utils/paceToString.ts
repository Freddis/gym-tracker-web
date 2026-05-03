export const paceToString = (pace: number) => {
  const minutes = Math.floor(pace / 60);
  const seconds = pace % 60;
  return `${minutes}:${seconds.toFixed(0).padStart(2, '0')}`;
};
