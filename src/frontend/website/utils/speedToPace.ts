export const speedToPace = (speed: number) => {
  if (speed === 0) {
    return 0;
  }
  return Math.round(1000 / speed);
};
