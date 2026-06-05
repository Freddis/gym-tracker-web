import {FC} from 'react';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {route, RouteId} from '../../../../../common/utils/route';
import {
  CalorieGoal,
  CalorieGoalEntryUpsertDto,
  Entry,
  EntryType,
  EntryVisibility,
} from '../../../../../common/utils/openapi-client';
import {api} from '../../../../../common/utils/api';
import {useNavigate} from '@tanstack/react-router';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {useRequiredAuth} from '../../../../../common/components/layout/AuthProvider/utils/useRequiredAuth';
import {v4} from 'uuid';
import {CalorieGoalCreatePagePresenter} from './components/CalorieGoalCreatePagePresenter';


export const CalorieGoalCreatePage: FC = () => {
  const t = useAppPartialTranslation((x) => x.pages.calorieGoal.create);
  const {user} = useRequiredAuth();
  const toasts = useToasts();
  const navigate = useNavigate();
  const {showToastsAndSetErrors, sliceErrors, errors} = useResponseErrors<CalorieGoalEntryUpsertDto>();
  const goal: CalorieGoal = {
    calories: 2000,
    carbs: 0,
    protein: 0,
    fat: 0,
    start: new Date(),
    end: null,
  };
  const entry: Entry = {
    id: v4(),
    type: EntryType.CALORIE_GOAL,
    calorieGoal: goal,
    user: user,
    visibility: EntryVisibility.PUBLIC,
    time: new Date(),
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    title: null,
    note: null,
    externalId: null,
    externalSource: null,
    healthkitId: null,
    healthkitAnchor: null,
    healthkitAnchors_3_0: null,
    healthkitSource: null,
    healthkitSourceName: null,
    healthkitDevice: null,
    healthkitDeviceName: null,
  };
  const onSave = async (meal: CalorieGoalEntryUpsertDto) => {
    const response = await api.putEntries({
      body: {
        items: [meal],
      },
    });
    if (response.error) {
      showToastsAndSetErrors(response);
      return;
    }
    toasts.addSuccess(t.p((x) => x.toasts.success));
    navigate({to: route(RouteId.EntryList)});
  };

  return (
    <CalorieGoalCreatePagePresenter goal={goal} entry={entry} onSave={onSave} errors={sliceErrors(errors, (x) => x)} />
  );
};
