export const dateToTimeString = (date: Date, skipSeconds = false) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  if (skipSeconds) {
    const result = `${hours}:${minutes}`;
    return result;
  }
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const result = `${hours}:${minutes}:${seconds}`;
  return result;
};
