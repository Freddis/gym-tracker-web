import {FC} from 'react';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';

export const EntryBlockDate: FC<{date: Date}> = ({date}) => {
  const {translations} = useAppPartialTranslation((x) => x.pages.activities.list.objects.weight);
  const weekDayString = translations.utils.time.weekDays[date.getDay()];
  console.log(date.getDay());
  return (
    <>
       {weekDayString} {date.toLocaleDateString()}, {date.toLocaleTimeString()}
    </>
  );
};
