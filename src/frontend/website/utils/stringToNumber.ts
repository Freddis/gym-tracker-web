export const stringToNumber = (value: string, defaultValue: number): number => {
  const parsed = Number(value);
  return isNaN(parsed) ? defaultValue : parsed;
};
