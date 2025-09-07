import {Translation} from './i18n/types/Translation';
import {dictionary as en} from './i18n/locales/en/en';

export const dateToEntryString = (date: Date, translations?: Translation) => {
  const weekDayStr = (translations ?? en).utils.time.weekDays[date.getDay()];
  const dateStr = date.toLocaleDateString();
  const timestr = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  const result = `${weekDayStr}, ${dateStr} ${timestr}`;
  return result;
};
