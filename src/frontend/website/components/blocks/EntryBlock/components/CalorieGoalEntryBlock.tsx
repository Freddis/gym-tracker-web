import {FC} from 'react';
import {CalorieGoal, Entry} from '../../../../../common/utils/openapi-client';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {route, RouteId} from '../../../../../common/utils/route';
import {EntryBlockBottom} from './EntryBlockBottom';
import {EntryBlockHeader} from './EntryBlockHeader';
import {PostContent} from './PostContent';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {AppLabel} from '../../../../../common/components/atoms/AppLabel/AppLabel';

export const CalorieGoalEntryBlock: FC<{entry: Entry, goal: CalorieGoal, own?: boolean}> = (props) => {
  const t = useAppPartialTranslation((x) => x.pages.activities.list.objects.calorieGoal);
  const {entry, goal, own} = props;
  return (
    <AppBlock data-testid={`entry-${entry.id}`}>
    <EntryBlockHeader
      entry={entry}
      own={own}
      to={route(RouteId.MealUpdate)}
      params={{id: entry.id.toString()}}
      title={t.p((x) => x.type)}
    />
    <PostContent entry={props.entry} />
    <div className="flex flex-row gap-5 items-center">
      <AppLabel>{t.f((x) => x.pages.food.list.labels.calories)}: {goal.calories.toFixed(0)}</AppLabel>
      <AppLabel>{t.f((x) => x.pages.food.list.labels.protein)}: {goal.protein.toFixed(1)}</AppLabel>
      <AppLabel>{t.f((x) => x.pages.food.list.labels.fat)}: {goal.fat.toFixed(1)}</AppLabel>
      <AppLabel>{t.f((x) => x.pages.food.list.labels.carbs)}: {goal.carbs.toFixed(1)}</AppLabel>
    </div>
    <EntryBlockBottom entry={entry} own={own} />
  </AppBlock>
  );
};
