export class TimeUtils {
  static now(): Date {
    return new Date();
  }

  static nowMs(): number {
    return Date.now();
  }

  static second(): number {
    return 1000;
  }

  static minute(): number {
    return 1000 * 60;
  }

  static hour(): number {
    return 1000 * 60 * 60;
  }

  static day(): number {
    return 1000 * 60 * 60 * 24;
  }

  static week(): number {
    return 1000 * 60 * 60 * 24 * 7;
  }

  static days30(): number {
    return 1000 * 60 * 60 * 24 * 30;
  }

  static getHourAgo(multiply = 1): Date {
    return new Date(Date.now() - TimeUtils.hour() * multiply);
  }

  static getDayAgo(multiply = 1): Date {
    return new Date(Date.now() - TimeUtils.day() * multiply);
  }

  static getDayFromNow(): Date {
    return new Date(Date.now() + TimeUtils.day());
  }

  static inPast(ms: number): Date {
    return new Date(Date.now() - ms);
  }

  static toTimeStamp(date: Date, removeTimezone: boolean = false): number {
    const timezoneOffset = removeTimezone ? 1000 * 60 * date.getTimezoneOffset() : 0;
    const newDate = new Date(date.getTime() - timezoneOffset);
    newDate.setMilliseconds(0);
    return newDate.getTime() / 1000;
  }
}
