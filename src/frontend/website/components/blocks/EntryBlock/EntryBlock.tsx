import {FC} from 'react';
import {FeedEntry} from '../../../../common/utils/openapi-client';
import {AppBlock} from '../../../../common/components/atoms/AppBlock/AppBlock';
import {WeightEntryBlock} from './components/WeightEntryBlock';
import {WorkoutEntryBlock} from './components/WorkoutEntryBlock';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';
import {PostEntryBlock} from './components/PostEntryBlock';
import {OutdoorRunEntryBlock} from './components/OutdoorRunEntryBlock';
import {OutdoorWalkEntryBlock} from './components/OutdoorWalkEntryBlock';
import {MealEntryBlock} from './components/MealEntryBlock';
import {CalorieGoalEntryBlock} from './components/CalorieGoalEntryBlock';

export const EntryBlock: FC<{entry: FeedEntry, own?: boolean}> = ({entry, own}) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.components.entryBlock.labels);
  if (entry.workout) {
    return <WorkoutEntryBlock entry={entry} workout={entry.workout!} own={own}/>;
  }
  if (entry.weight) {
    return <WeightEntryBlock entry={entry} weight={entry.weight} own={own}/>;
  }
  if (entry.outdoorRun) {
    return <OutdoorRunEntryBlock entry={entry} outdoorRun={entry.outdoorRun!} own={own}/>;
  }
  if (entry.outdoorWalk) {
    return <OutdoorWalkEntryBlock entry={entry} outdoorWalk={entry.outdoorWalk!} own={own}/>;
  }
  if (entry.meal) {
    return <MealEntryBlock entry={entry} meal={entry.meal} own={own}/>;
  }
  if (entry.calorieGoal) {
    return <CalorieGoalEntryBlock entry={entry} goal={entry.calorieGoal} own={own}/>;
  }
  if (entry.type === 'Post') {
    return <PostEntryBlock entry={entry} own={own}/>;
  }
  return <AppBlock>{t(i18n.unkownEntry)}</AppBlock>;
};
