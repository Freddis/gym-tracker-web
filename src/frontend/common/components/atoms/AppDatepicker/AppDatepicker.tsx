import {format} from 'date-fns';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover';
import {ChangeEventHandler, FC, useContext, useEffect, useState} from 'react';
import {cn} from '../../../utils/cn';
import {LanguageContext} from '../../layout/LanguageProvider/context/LanguageContext';
import {CalendarIcon} from 'lucide-react';
import {Button} from '../../shadcn/button';
import {Calendar} from '../../shadcn/calendar';
import {Input} from '../../shadcn/input';
import {dateToTimeString} from '../../../../website/utils/dateToTimeString';
import {CalendarDay} from 'react-day-picker';

interface AppDatepickerProps {
  value?: Date;
  className?: string;
  onChange?: (date: Date) => void;
  'data-testid'?: string;
  dateOnly?: boolean;
  markedDays?: Date[];
}

export const AppDatepicker: FC<AppDatepickerProps> = (props) => {
  const {'data-testid': testid} = props;
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(props.value);
  const timeStr = date ? dateToTimeString(date, true) : undefined;
  const [time, setTime] = useState(timeStr);
  const locale = useContext(LanguageContext).getLocale();
  useEffect(() => {
    setDate(props.value);
    if (props.value) {
      setTime(dateToTimeString(props.value, true));
    }
  }, [props.value]);

  const onDateSelected = (newDate: Date) => {
    const newTime = props.dateOnly ? '00:00:00' : time ?? '13:00:00';
    const timeDate = new Date(`1970-01-01T${newTime}`);
    newDate.setHours(timeDate.getHours());
    newDate.setMinutes(timeDate.getMinutes());
    newDate.setSeconds(timeDate.getSeconds());
    newDate.setMilliseconds(timeDate.getMilliseconds());
    setDate(newDate);
    setTime(dateToTimeString(newDate, true));
    setOpen(false);
    if (props.onChange) {
      props.onChange(newDate);
    }
  };

  const onTimeChanged:ChangeEventHandler<HTMLInputElement> = (e) => {
    const newTime = e.target.value;
    const newDate = date ?? new Date();
    const timeDate = new Date(`1970-01-01T${newTime}`);
    newDate.setHours(timeDate.getHours());
    newDate.setMinutes(timeDate.getMinutes());
    newDate.setSeconds(timeDate.getSeconds());
    newDate.setMilliseconds(timeDate.getMilliseconds());
    setDate(newDate);
    setTime(dateToTimeString(newDate, true));
    if (props.onChange) {
      props.onChange(newDate);
    }
  };

  return (
    <div className={cn('flex gap-4 w-full', props.className)}>
      <div className="flex flex-col gap-3 grow">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={'secondary'}
              data-empty={!date}
              data-testid={testid}
              className={
                `data-[empty=true]:text-muted-foreground justify-start p-3 h-10
            text-left border-1 border-in-cavity cursor-pointer relative`}
            >
              <div className="flex w-full gap-5">
                {date ? (
                  format(date, 'PPP', {locale})
                ) : (
                  <span>Pick a date</span>
                )}
                <div className="grow flex flex-row-reverse">
                  <CalendarIcon className="opacity-50" size={24} />
                </div>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0 z-10" align="start">
            <Calendar
              mode="single"
              selected={date}
              defaultMonth={date ?? new Date()}
              captionLayout="dropdown"
              onSelect={onDateSelected}
              required
              locale={locale}
              components={{
                Day: ({day}) => {
                  return (
                    <Button
                    onClick={() => onDateSelected(day.date)}
                    disabled={props.markedDays?.includes(day.date)}
                    variant={date && day.isEqualTo(new CalendarDay(date, date)) ? 'default' : 'secondary'}
                    size="icon"
                    className="relative mx-0.5"
                    >
                      {(props.markedDays ?? []).find((d) => d.toDateString() === day.date.toDateString()) && (
                        <div
                        className={cn(
                          'size-1 absolute left-1/2 -translate-x-1/2 bottom-0.5 rounded-full',
                          date && day.isEqualTo(new CalendarDay(date, date)) ? 'bg-white' : 'bg-accent'
                        )} />
                      )}
                      <span>{day.date.getDate()}</span>
                    </Button>
                  );
                },
              }}
              className=" rounded-sm border border-on-cavity/10 z-10"
            />
          </PopoverContent>
        </Popover>
      </div>
      {!props.dateOnly && (
        <div className="flex flex-col gap-3">
        <Input
          key={time === undefined ? 1 : 2} // controlled / uncontrolled input problem fix
          type="time"
          id="time-picker"
          step="60"
          onChange={onTimeChanged}
          value={time}
          disabled={time === undefined}
          className="bg-cavity border-in-cav appearance-none [&::-webkit-calendar-picker-indicator]:hidden
          [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
      )}
    </div>
  );
};
